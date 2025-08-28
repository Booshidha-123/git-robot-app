import { NextResponse } from "next/server";

// Utility: get current branch reference
async function getBranchRef(owner: string, repo: string, token: string, branch = "main") {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function POST(req: Request) {
  try {
    const { token, owner, repo, filename, content, message } = await req.json();

    // Encode content to Base64 (GitHub requirement)
    const base64Content = Buffer.from(content).toString("base64");

    // Check branch ref (main)
    const ref = await getBranchRef(owner, repo, token);
    const sha = ref?.object?.sha;

    // Create / update file
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filename}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: message || "Add " + filename,
        content: base64Content,
        branch: "main",
        sha: sha || undefined,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: "✅ File committed & pushed!" });
  } catch (err) {
    return NextResponse.json({ error: "Push failed" }, { status: 400 });
  }
}
