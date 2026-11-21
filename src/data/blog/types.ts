import type { ComponentType } from "react";

export interface BlogPostMeta {
  /** URL-safe identifier; the post lives at /blog/[slug]. */
  slug: string;
  /** Headline shown on the index, the detail page, and OG cards. */
  title: string;
  /** Short summary (~155 chars) for SERP snippets and OG descriptions. */
  description: string;
  /** ISO date string. Used for sitemap, JSON-LD, and sort order. */
  publishedAt: string;
  /** Optional last-updated date (defaults to publishedAt). */
  updatedAt?: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  /** Topical tags surfaced on the page and in JSON-LD keywords. */
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  /** React component rendering the post body (plain TSX — no MDX). */
  Body: ComponentType;
}
