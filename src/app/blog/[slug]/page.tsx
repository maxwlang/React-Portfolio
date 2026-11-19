import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import allPosts, { getPostBySlug } from "@/data/blog";
import Section from "@/components/shared/Section";
import TextPill from "@/components/shared/TextPill";
import { SITE_URL, blogPostingJsonLd } from "@/lib/jsonld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Maxwell Lang`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["Maxwell Lang"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Maxwell Lang`,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = blogPostingJsonLd({
    title: post.title,
    description: post.description,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.tags,
  });

  const Body = post.Body;

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
              href="/blog"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← All posts
            </Link>
          </nav>

          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true"> · </span>
              {post.readingTime} min read
            </p>
          </header>

          <div className="post-body text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
            <Body />
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-300 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <TextPill key={i} text={tag} />
              ))}
            </div>
          </footer>
        </article>
      </Section>
    </main>
  );
}
