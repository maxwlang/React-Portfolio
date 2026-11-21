import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import projects from "@/data/projects";
import LinkButton from "@/components/shared/LinkButton";
import Section from "@/components/shared/Section";
import TextPill from "@/components/shared/TextPill";
import { SITE_URL, creativeWorkJsonLd } from "@/lib/jsonld";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects
    .filter((p) => !p.externalOnly)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || project.externalOnly) {
    return { title: "Project not found" };
  }
  const url = `${SITE_URL}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | Maxwell Lang`,
      description: project.description,
      url,
      type: "article",
      ...(project.year ? { publishedTime: `${project.year}-01-01` } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Maxwell Lang`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || project.externalOnly) notFound();

  const url = `${SITE_URL}/projects/${project.slug}`;
  const jsonLd = creativeWorkJsonLd({
    name: project.title,
    description: project.description,
    url,
    image: project.image ? `${SITE_URL}${project.image.src}` : undefined,
    year: project.year,
    programmingLanguages: project.programmingLanguages,
    keywords: project.tags,
    codeRepository: project.links?.find((l) =>
      l.url.includes("github.com"),
    )?.url,
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 min-h-screen">
        <article className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              href="/projects"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← All projects
            </Link>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {project.subtitle}
              </p>
            )}
            {(project.year || project.programmingLanguages?.length) && (
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {project.year && <span>{project.year}</span>}
                {project.year && project.programmingLanguages?.length ? (
                  <span aria-hidden="true"> · </span>
                ) : null}
                {project.programmingLanguages?.length && (
                  <span>{project.programmingLanguages.join(", ")}</span>
                )}
              </p>
            )}
          </header>

          {project.image && (
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              className="rounded-lg shadow-xl w-full mb-8 object-cover"
              priority
            />
          )}

          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-200 mb-8">
            {project.longDescription ? (
              project.longDescription
                .split(/\n{2,}/)
                .map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <p>{project.description}</p>
            )}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {project.links.map((link, i) => (
                <LinkButton
                  key={i}
                  text={link.title}
                  href={link.url}
                  variant={link.variant ?? "secondary"}
                  icon={link.icon ?? faLink}
                />
              ))}
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {project.gallery.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="rounded-lg shadow-md w-full object-cover"
                />
              ))}
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <TextPill key={i} text={tag} />
              ))}
            </div>
          )}
        </article>
      </Section>
    </main>
  );
}
