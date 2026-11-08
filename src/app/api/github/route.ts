import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface GitHubSearchCommitItem {
  sha: string;
  html_url: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  repository: {
    name: string;
  };
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/search/commits?q=author:ChoniGomez&sort=author-date&order=desc&per_page=15",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PAT}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "portfolio-app",
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Error en GitHub API" },
        { status: 500 },
      );
    }

    if (!data.items) {
      return NextResponse.json({ commits: [] });
    }

    const commits = (data.items as GitHubSearchCommitItem[]).map((item) => ({
      id: item.sha,
      hash: item.sha ? item.sha.substring(0, 7) : "",
      author: item.commit?.author?.name || "Jonathan Gomez",
      message: item.commit?.message || "",
      date: item.commit?.author?.date || "",
      repoName: item.repository?.name || "",
      url: item.html_url,
    }));

    return NextResponse.json({ commits });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
