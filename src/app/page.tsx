"use client";

import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";

export default function HomePage() {
  const handlePush = async () => {
  const token = document.cookie.split("githubToken=")[1]?.split(";")[0];
  const owner = document.cookie.split("githubOwner=")[1]?.split(";")[0];
  const repo = document.cookie.split("githubRepo=")[1]?.split(";")[0];

  const res = await fetch("/api/gitpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      owner,
      repo,
      filename: "test.txt",
      content: "Hello from Next.js 🚀",
      message: "Initial commit",
    }),
  });

  const data = await res.json();
  alert(data.message || " " + data.error);
};

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  useEffect(() => {
    setUsername(getCookie("username") as string || "");
    setEmail(getCookie("email") as string || "");
    setToken(getCookie("token") as string || "");
    setOwner(getCookie("owner") as string || "");
    setRepo(getCookie("repo") as string || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setCookie("username", username);
    setCookie("email", email);
    setCookie("token", token);
    setCookie("owner", owner);
    setCookie("repo", repo);
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    const data = await res.json();
    if (data.success) {
      alert(" Saved & Git Config Updated!");
    } else {
      alert(" Error: " + data.error);
    }
  };
  
  

  return (
    <main className="p-6">
      <button
  onClick={handlePush}
  className="mt-4 p-2 bg-green-600 text-white rounded-lg"
>
  Commit & Push
</button>

      <h1 className="text-2xl font-bold mb-4">GitHub Project Setup</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Owner</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Repo</label>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save & Configure
        </button>
      </form>
      
    </main>
  );
}
