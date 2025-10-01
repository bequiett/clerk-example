import Repo from "@/components/Repo";
import RepoDirs from "@/components/RepoDirs";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function RepoPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  return (
    <div className="flex flex-col justify-start items-start max-w-lg">
      <Link
        href="/repos"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back to Repositories
      </Link>
      <Suspense fallback={<div>Loading repo...</div>}>
        <Repo name={name} />
      </Suspense>
      <Suspense fallback={<div>Loading project...</div>}>
        <RepoDirs name={name} />
      </Suspense>
    </div>
  );
}
