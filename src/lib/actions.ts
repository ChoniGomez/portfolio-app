"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { createElement } from "react";
import { ContactTemplate } from "@/components/emails/ContactTemplate";
import { contactFormSchema } from "./validation";

const resend = new Resend(process.env.RESEND_API_KEY);

// GitHub GraphQL Queries
const GITHUB_PROFILE_QUERY = `
query($userName:String!) { 
  user(login: $userName) {
    avatarUrl
    name
    login
    repositories {
      totalCount
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
  }
}
`;

const GITHUB_CONTRIBUTIONS_QUERY = `
query($userName:String!) { 
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export async function getGitHubProfile() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_PROFILE_QUERY,
        variables: { userName: "chonigomez" },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.data.user;
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    throw new Error("Failed to fetch GitHub profile");
  }
}

export async function getGitHubContributions() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_CONTRIBUTIONS_QUERY,
        variables: { userName: "chonigomez" },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw new Error("Failed to fetch GitHub contributions");
  }
}

export async function getGitHistory() {
  const username = "ChoniGomez";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: {
          ...(process.env.GITHUB_PAT
            ? { Authorization: `Bearer ${process.env.GITHUB_PAT}` }
            : {}),
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      console.warn(
        `GitHub API responded with status ${response.status} for ${username} events`,
      );
      return [];
    }

    const events = await response.json();
    if (!Array.isArray(events)) return [];

    const pushEvents = events.filter(
      (e) => e.type === "PushEvent" && Array.isArray(e.payload?.commits),
    );

    const commits = [];
    for (const event of pushEvents) {
      const repoName = event.repo?.name || "ChoniGomez/portfolio-app";
      const date = event.created_at;

      if (Array.isArray(event.payload?.commits)) {
        for (const commit of event.payload.commits) {
          const authorName = commit.author?.name || "Jonathan Gomez";
          const message = commit.message || "(Sin mensaje)";
          const commitUrl = `https://github.com/${repoName}/commit/${commit.sha}`;

          commits.push({
            sha: commit.sha,
            authorName,
            message,
            date,
            commitUrl,
            repoName,
            html_url: commitUrl,
            commit: {
              author: {
                name: authorName,
                date,
              },
              message,
            },
          });
        }
      }
    }

    return commits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    return [];
  }
}

export const createPost = async (formData: FormData) => {
  const user = await currentUser();
  const desc = formData.get("desc") as string;

  if (!user) {
    return redirect("/guest-book");
  }

  if (!desc) {
    return redirect("/guest-book");
  }

  try {
    // Create or update user in our database with only the fields we have in our schema
    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        name: user.username || user.firstName || "Anonymous",
        image: user.imageUrl || null,
      },
      update: {
        name: user.username || user.firstName || "Anonymous",
        image: user.imageUrl || null,
      },
    });

    // Create the guest book entry
    await prisma.guestBookEntry.create({
      data: {
        message: desc,
        userId: dbUser.id,
      },
    });

    revalidatePath("/guest-book");
    revalidateTag("guestBookEntries");
  } catch (error) {
    throw error;
  }
};

type EmailState = { success: boolean } | null;

export async function sendEmail(prevState: EmailState, formData: FormData) {
  const recaptchaToken = formData.get("recaptchaToken") as string;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (secretKey) {
    if (!recaptchaToken) {
      throw new Error("Verificación de reCAPTCHA requerida.");
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(recaptchaToken)}`,
      },
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      console.error("Fallo de verificación reCAPTCHA:", verifyData);
      throw new Error(
        "La verificación de reCAPTCHA no fue válida. Por favor intenta de nuevo.",
      );
    }
  }

  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const result = contactFormSchema.safeParse(rawFormData);

  if (!result.success) {
    const errorMessages = result.error.errors
      .map((error) => error.message)
      .join(", ");
    throw new Error(errorMessages);
  }

  const validatedData = result.data;

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ing.gomezjonathan@gmail.com",
      subject: `[Portfolio Contact] - ${validatedData.name}`,
      replyTo: validatedData.email,
      react: createElement(ContactTemplate, validatedData),
    });

    if (error) {
      console.error("Error de Resend:", error);
      throw new Error(error.message || "Error al enviar correo con Resend");
    }

    return { success: true };
  } catch (error) {
    console.error("Error de Resend:", error);
    throw error instanceof Error
      ? error
      : new Error("No se pudo enviar el mensaje. Por favor intenta de nuevo.");
  }
}

export interface AstronomyData {
  sun_altitude: number;
  sun_azimuth: number;
  moon_altitude: number;
  moon_azimuth: number;
  moon_phase: string;
  moon_illumination_percentage: string;
  sunrise: string;
  sunset: string;
}

const DEFAULT_ASTRONOMY_DATA: AstronomyData = {
  sun_altitude: 45,
  sun_azimuth: 180,
  moon_altitude: -20,
  moon_azimuth: 0,
  moon_phase: "Full Moon",
  moon_illumination_percentage: "100",
  sunrise: "06:00",
  sunset: "18:00",
};

export async function getAstronomyData(): Promise<AstronomyData> {
  const apiKey = process.env.IP_GEOLOCATION_API_KEY;

  if (!apiKey) {
    console.warn(
      "IP_GEOLOCATION_API_KEY no está definida. Usando datos astronómicos por defecto.",
    );
    return DEFAULT_ASTRONOMY_DATA;
  }

  try {
    const response = await fetch(
      `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}`,
      { next: { revalidate: 60 } }, // Cache for 1 minute
    );

    if (!response.ok) {
      console.warn(
        `Error al consultar IP Geolocation API (${response.status}). Usando datos astronómicos por defecto.`,
      );
      return DEFAULT_ASTRONOMY_DATA;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    return DEFAULT_ASTRONOMY_DATA;
  }
}
