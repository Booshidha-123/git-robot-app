import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email } = await req.json();

    return new Promise((resolve) => {
      exec(
        `git config --global user.name "${username}" && git config --global user.email "${email}"`,
        (error, stdout, stderr) => {
          if (error) {
            resolve(NextResponse.json({ error: stderr }, { status: 500 }));
          } else {
            resolve(
              NextResponse.json({ success: true, message: "Git config updated" })
            );
          }
        }
      );
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
