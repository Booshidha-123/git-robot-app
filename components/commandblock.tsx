"use client";

import { useState } from "react";

export default function CommandBlock({
  title,
  commands,
}: {
  title: string;
  commands: string[];
}) {
  const [copied, setCopied] = useState(false);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(commands.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // noop
    }
  };

  return (
    <div className="rounded-xl border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={copyAll}
          className="px-3 py-1 rounded border text-sm"
          aria-label="Copy all commands"
        >
          {copied ? "Copied!" : "Copy All"}
        </button>
      </div>
      <ol className="space-y-2 list-decimal pl-5">
        {commands.map((c, i) => (
          <li key={i}>
            <pre className="whitespace-pre-wrap break-all rounded bg-black/5 dark:bg-white/10 p-2 text-sm">
              {c}
            </pre>
          </li>
        ))}
      </ol>
    </div>
  );
}
