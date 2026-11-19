import type { BlogPost } from "./types";
import scalingMicroservicesKafka from "./scaling-microservices-kafka";
import idempotencyAtTheWorkUnitLevel from "./idempotency-at-the-work-unit-level";
import errorHandlingFrameworkAtScale from "./error-handling-framework-at-scale";
import sharedClientLibraryAsProduct from "./shared-client-library-as-product";
import typescriptDomainModelingDiscriminatedUnions from "./typescript-domain-modeling-discriminated-unions";
import fastifyVsExpressThroughput from "./fastify-vs-express-throughput";
import rssToDiscordHarbingerArchitecture from "./rss-to-discord-harbinger-architecture";
import homelabK3sZeroTrust from "./homelab-k3s-zero-trust";

const posts: BlogPost[] = [
  scalingMicroservicesKafka,
  idempotencyAtTheWorkUnitLevel,
  errorHandlingFrameworkAtScale,
  sharedClientLibraryAsProduct,
  typescriptDomainModelingDiscriminatedUnions,
  fastifyVsExpressThroughput,
  rssToDiscordHarbingerArchitecture,
  homelabK3sZeroTrust,
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
