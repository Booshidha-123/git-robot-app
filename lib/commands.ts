export type GitInputs = {
  username: string;
  owner: string;
  repo: string;
  token?: string;
};

function sanitize(v: string) {
  return (v || "").trim();
}

export function normalize(inputs: GitInputs): Required<GitInputs> {
  const username = sanitize(inputs.username) || "your-username";
  const owner = sanitize(inputs.owner) || username;
  const repo = sanitize(inputs.repo) || "sample-repo";
  const token = sanitize(inputs.token || "");
  return { username, owner, repo, token };
}

function cloneUrl({ username, token, owner, repo }: Required<GitInputs>) {

  if (!token) return `https://github.com/${owner}/${repo}.git`;
  return `https://${encodeURIComponent(username)}:${encodeURIComponent(
    token
  )}@github.com/${owner}/${repo}.git`;
}


export function templateCloneReadme(inputs: GitInputs): string[] {
  const n = normalize(inputs);
  return [
    `git clone ${cloneUrl(n)}`,
    `cd ${n.repo}`,
    `echo "## Updated by Robot on $(date)" >> README.md`,
    `git add README.md`,
    `git commit -m "chore: update README via robot"`,
    `git push origin HEAD`,
  ];
}


export function templateFeatureBranch(inputs: GitInputs): string[] {
  const n = normalize(inputs);
  const branch = `feat/robot-readme-${Date.now()}`;
  return [
    `git clone ${cloneUrl(n)}`,
    `cd ${n.repo}`,
    `git checkout -b ${branch}`,
    `echo "- robot change $(date)" >> README.md`,
    `git add README.md`,
    `git commit -m "feat: robot README tweak"`,
    `git push -u origin ${branch}`,
  ];
}


export function templateNewFile(inputs: GitInputs): string[] {
  const n = normalize(inputs);
  return [
    `git clone ${cloneUrl(n)}`,
    `cd ${n.repo}`,
    `echo "Robot log $(date)" >> robot-log.txt`,
    `git add robot-log.txt`,
    `git commit -m "chore: add robot-log entry"`,
    `git push origin HEAD`,
  ];
}

export const TEMPLATE_LIST = [
  { id: "1", title: "Clone & Update README", build: templateCloneReadme },
  { id: "2", title: "Feature Branch + README tweak", build: templateFeatureBranch },
  { id: "3", title: "Add new file and push", build: templateNewFile },
];

export function buildTemplateById(id: string, inputs: GitInputs) {
  const t = TEMPLATE_LIST.find((x) => x.id === id) ?? TEMPLATE_LIST[0];
  return { title: t.title, commands: t.build(inputs) };
}
