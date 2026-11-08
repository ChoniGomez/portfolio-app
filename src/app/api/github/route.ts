import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/ChoniGomez/events?per_page=100', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'portfolio-app'
      },
      cache: 'no-store'
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Error en GitHub API" },
        { status: 500 }
      );
    }

    if (!Array.isArray(data)) {
      return NextResponse.json(
        {
          error:
            "GitHub no devolvió un array. Respuesta: " +
            JSON.stringify(data).substring(0, 100),
        },
        { status: 500 }
      );
    }

    const pushEvents = data.filter((e: { type?: string }) => e.type === 'PushEvent');
    const eventTypes = [...new Set(data.map((e: { type?: string }) => e.type))];
    return NextResponse.json({
      events: pushEvents,
      debug_total: data.length,
      debug_types: eventTypes,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
