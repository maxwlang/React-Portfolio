import type { Metadata } from "next";
import Link from "next/link";
import projects from "@/data/projects";
import ProjectCard from "@/components/home/ProjectCard";
import Section from "@/components/shared/Section";
import { SITE_URL } from "@/lib/jsonld";

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "A working catalog of Maxwell Lang's projects — from production TypeScript and Node.js services to Arduino firmware and self-hosted utilities.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: `${PAGE_TITLE} | Maxwell Lang`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/projects`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Maxwell Lang`,
    description: PAGE_DESCRIPTION,
  },
};

export default function ProjectsIndexPage() {
  return (
    <main>
      <Section className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Home
            </Link>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
            {PAGE_DESCRIPTION}
          </p>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
