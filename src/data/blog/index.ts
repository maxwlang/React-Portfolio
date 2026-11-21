import type { BlogPost } from "./types";

const posts: BlogPost[] = [
];

/**
 * All posts, newest first. Use this for the index, sitemap, and feeds.
 */
export const allPosts: BlogPost[] = [...posts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/** Lookup helper. Returns undefined if no post matches. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export default allPosts;
