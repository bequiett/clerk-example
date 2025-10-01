import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { USERNAME } from "@/constants/github";

interface RepoProps {
  name: string;
}

export default async function Repo({ name }: RepoProps) {
  const response = await fetch(
    `https://api.github.com/repos/${USERNAME}/${name}`,
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
  const repo = await response.json();

  return (
    <div>
      <h3 className="text-xl font-bold">
        <Link href={`https://github.com/${USERNAME}/${name}`}>{repo.name}</Link>
      </h3>
      <p>{repo.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center gap-1">
          <FaStar /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch /> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <FaEye /> {repo.stargazers_count}
        </span>
      </div>
    </div>
  );
}
