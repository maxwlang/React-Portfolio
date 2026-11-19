import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/jsonld";
import projects from "@/data/projects";
import allPosts from "@/data/blog";

/**
 * Sitemap generator. Surfaces the home, projects index/detail, and blog
 * index/detail routes. Excludes external-only project entries (those have
 * no canonical detail page on this site).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => !p.externalOnly)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.year ? new Date(`${p.year}-12-31`) : now,
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  const blogEntries: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(
      (post.updatedAt ?? post.publishedAt) + "T00:00:00Z",
    ),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
