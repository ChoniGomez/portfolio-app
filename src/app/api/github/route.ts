import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RepoOwner {
  login: string;
}

interface RepositoryItem {
  name: string;
  owner: RepoOwner;
}

interface CommitAuthor {
  name?: string;
  date?: string;
}

interface CommitDetails {
  author?: CommitAuthor;
  message?: string;
}

interface GitHubCommitResponseItem {
  sha: string;
  html_url: string;
  commit: CommitDetails;
}

interface MappedCommit {
  id: string;
  hash: string;
  author: string;
  message: string;
  date: string;
  repoName: string;
  url: string;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-app",
    };

    // 1. Obtener los 3 repositorios con push más reciente
    const reposRes = await fetch(
      "https://api.github.com/user/repos?sort=pushed&per_page=3",
      { headers, cache: "no-store" },
    );

    if (!reposRes.ok) {
      const errorData = await reposRes.json().catch(() => null);
      throw new Error(
        errorData?.message || `Error al obtener repositorios (${reposRes.status})`,
      );
    }

    const repos: RepositoryItem[] = await reposRes.json();

    // 2. Extraer los commits en tiempo real de cada repositorio
    let allCommits: MappedCommit[] = [];

    for (const repo of repos) {
      if (!repo.owner?.login || !repo.name) continue;

      const commitsRes = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=5`,
        { headers, cache: "no-store" },
      );

      if (commitsRes.ok) {
        const commits: GitHubCommitResponseItem[] = await commitsRes.json();
        const mappedCommits: MappedCommit[] = commits.map((item) => ({
          id: item.sha,
          hash: item.sha ? item.sha.substring(0, 7) : "",
          author: item.commit?.author?.name || "Jonathan Gomez",
          message: item.commit?.message || "",
          date: item.commit?.author?.date || "",
          repoName: repo.name,
          url: item.html_url,
        }));
        allCommits = [...allCommits, ...mappedCommits];
      }
    }

    // 3. Ordenar globalmente por fecha (más nuevo a más viejo) y tomar los últimos 15
    allCommits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return NextResponse.json({ commits: allCommits.slice(0, 15) });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
