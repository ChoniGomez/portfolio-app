import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface GitHubEventCommit {
  sha: string;
  author?: {
    name?: string;
    email?: string;
  };
  message?: string;
  distinct?: boolean;
  url?: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo?: {
    id?: number;
    name?: string;
    url?: string;
  };
  payload?: {
    commits?: GitHubEventCommit[];
  };
  created_at: string;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_PAT;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-app",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      "https://api.github.com/users/ChoniGomez/events",
      {
        headers,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        `Error al consultar GitHub API: ${response.status} ${response.statusText}`,
      );
      return NextResponse.json(
        {
          error: `Error de GitHub (${response.status}): ${response.statusText}`,
          commits: [],
        },
        { status: response.status },
      );
    }

    const events: GitHubEvent[] = await response.json();

    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: "Respuesta inesperada de GitHub", commits: [] },
        { status: 500 },
      );
    }

    // Filtrar los eventos de tipo PushEvent
    const pushEvents = events.filter(
      (event) =>
        event.type === "PushEvent" && Array.isArray(event.payload?.commits),
    );

    const extractedCommits = [];

    for (const event of pushEvents) {
      const repoName = event.repo?.name || "ChoniGomez/portfolio-app";
      const eventDate = event.created_at;

      if (Array.isArray(event.payload?.commits)) {
        for (const commit of event.payload.commits) {
          const authorName = commit.author?.name || "Jonathan Gomez";
          const message = commit.message || "(Sin mensaje de commit)";
          const commitUrl = `https://github.com/${repoName}/commit/${commit.sha}`;

          extractedCommits.push({
            sha: commit.sha,
            authorName,
            message,
            date: eventDate,
            commitUrl,
            repoName,
            html_url: commitUrl,
            commit: {
              author: {
                name: authorName,
                date: eventDate,
              },
              message,
            },
          });
        }
      }
    }

    return NextResponse.json(extractedCommits, { status: 200 });
  } catch (error) {
    console.error("Error en /api/git-history:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error interno al procesar el historial de Git",
        commits: [],
      },
      { status: 500 },
    );
  }
}
