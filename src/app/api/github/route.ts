import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, owner, repo } = await req.json();

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 404) {
      // repo doesn’t exist → create
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          name: repo,
          private: false,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        return NextResponse.json({ error: err }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Repo created" });
    }

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Repo already exists" });
    }

    return NextResponse.json({ error: "GitHub error" }, { status: response.status });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
