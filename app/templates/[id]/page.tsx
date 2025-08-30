import CommandBlock from "@/components/commandblock";
import { buildTemplateById, GitInputs } from "@/lib/commands";

type Props = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function TemplatePage({ params, searchParams = {} }: Props) {
  const id = params.id;
  // read from search params (we DO NOT accept token from URL for safety)
  const inputs: GitInputs = {
    username: (searchParams.username as string) || "",
    owner: (searchParams.owner as string) || "",
    repo: (searchParams.repo as string) || "",
    token: "", // token intentionally ignored on dynamic page
  };

  const { title, commands } = buildTemplateById(id, inputs);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Populate with your username/owner/repo. Token is not included in URL.
      </p>
      <CommandBlock title={title} commands={commands} />
    </div>
  );
}
