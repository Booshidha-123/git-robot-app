"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FormField from "@/components/formfield";
import CommandBlock from "@/components/commandblock";
import {
  TEMPLATE_LIST,
  templateCloneReadme,
  templateFeatureBranch,
  templateNewFile,
} from "@/lib/commands";

export default function Home() {
  const [username, setUsername] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [token, setToken] = useState("");

  // load/save (avoid storing token)
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("git-robot:lastForm") || "{}"
      );
      if (saved.username) setUsername(saved.username);
      if (saved.owner) setOwner(saved.owner);
      if (saved.repo) setRepo(saved.repo);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "git-robot:lastForm",
      JSON.stringify({ username, owner, repo })
    );
  }, [username, owner, repo]);

  const inputs = useMemo(
    () => ({ username, owner, repo, token }),
    [username, owner, repo, token]
  );

  const previews = useMemo(
    () => [
      { title: "Clone & Update README", commands: templateCloneReadme(inputs) },
      { title: "Feature Branch + README tweak", commands: templateFeatureBranch(inputs) },
      { title: "Add new file and push", commands: templateNewFile(inputs) },
    ],
    [inputs]
  );

  const query = new URLSearchParams({
    username: username || "",
    owner: owner || "",
    repo: repo || "",
    // IMPORTANT: do NOT pass token in URL. Dynamic page will still build clone URL without token.
  }).toString();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Git Command Robot</h1>
      <p className="text-sm text-gray-500">
        Enter details and preview command templates. (Execution will come in Week 5)
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="alice"
          required
        />
        <FormField
          label="Owner (org/user)"
          name="owner"
          value={owner}
          onChange={(e) => setOwner(e.currentTarget.value)}
          placeholder="alice-or-org"
          required
        />
        <FormField
          label="Repo"
          name="repo"
          value={repo}
          onChange={(e) => setRepo(e.currentTarget.value)}
          placeholder="my-repo"
          required
        />
        <FormField
          label="Token (optional – not stored)"
          name="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.currentTarget.value)}
          placeholder="ghp_***"
        />
      </form>

      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">Preview (3 templates)</h2>
        {previews.map((p, idx) => (
          <CommandBlock key={idx} title={p.title} commands={p.commands} />
        ))}

        <div className="flex flex-wrap gap-2 mt-2">
          {TEMPLATE_LIST.map((t) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}?${query}`}
              className="px-3 py-1 rounded border text-sm"
            >
              Open “{t.title}”
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
