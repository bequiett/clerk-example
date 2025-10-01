import Link from "next/link";
import { GitHubContent } from "@/types/github";
import { FaFile, FaFolderOpen } from "react-icons/fa";
import { USERNAME } from "@/constants/github";

interface RepoProps {
  name: string;
}

export default async function RepoDirs({ name }: RepoProps) {
  const response = await fetch(
    `https://api.github.com/repos/${USERNAME}/${name}/contents`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository: " + response.statusText);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const contents: GitHubContent[] = await response.json();
  const dirs = contents.filter((content) => content.type === "dir");
  const files = contents.filter((content) => content.type === "file");

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Project Overview</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link
              className="flex items-center gap-2 underline"
              href={`https://github.com/${USERNAME}/${name}/tree/master/${dir.path}`}
            >
              <FaFolderOpen />
              <span>{dir.path}</span>
            </Link>
          </li>
        ))}
        {files.map((file) => (
          <li key={file.path}>
            <Link
              className="flex items-center gap-2 underline"
              href={`https://github.com/${USERNAME}/${name}/tree/master/${file.path}`}
            >
              <FaFile />
              <span>{file.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}