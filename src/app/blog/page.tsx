import type { Metadata } from "next";
import Link from "next/link";
import allPosts from "@/data/blog";
import Section from "@/components/shared/Section";
import TextPill from "@/components/shared/TextPill";
import { SITE_URL } from "@/lib/jsonld";

const PAGE_TITLE = "Blog";
const PAGE_DESCRIPTION =
  "Notes from Maxwell Lang on building distributed systems, TypeScript at scale, event-driven architecture, and the craft of shipping reliable software.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `${PAGE_TITLE} | Maxwell Lang`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Maxwell Lang`,
    description: PAGE_DESCRIPTION,
  },
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  return (
    <main>
      <Section className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Home
            </Link>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            {PAGE_DESCRIPTION}
          </p>

          <ul className="space-y-10">
            {allPosts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-gray-300 dark:border-slate-700 pb-10 last:border-b-0"
              >
                <article>
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span aria-hidden="true"> · </span>
                    {post.readingTime} min read
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <TextPill key={i} text={tag} />
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
