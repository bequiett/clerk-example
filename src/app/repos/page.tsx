import { Repository } from "@/types/repo";
import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { USERNAME } from "@/constants/github";

export default async function ReposPage() {
  // ISR - Incremental Static Regeneration
  // revalidate the data every 60 seconds
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories: " + response.statusText);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const repos = await response.json();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {USERNAME}
      </h2>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md dark:bg-gray-800">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
