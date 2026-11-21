/**
 * Structured data (JSON-LD) helpers for SEO.
 *
 * These objects are emitted as <script type="application/ld+json"> in pages
 * to give search engines richer context about the site and its author.
 */

export const SITE_URL = "https://maxwlang.com";
export const SITE_NAME = "Maxwell Lang";

const SAME_AS = [
  "https://github.com/maxwlang",
  "https://www.linkedin.com/in/maxwlang",
] as const;

/**
 * Schema.org Person describing Maxwell Lang. Used on the home page so
 * recruiters and search engines can resolve identity, location, role, and
 * skills from a single canonical source.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maxwell Lang",
  givenName: "Maxwell",
  familyName: "Lang",
  url: SITE_URL,
  image: `${SITE_URL}/profile-3000x3000.png`,
  jobTitle: "Senior Software Engineer",
  description:
    "Senior software engineer specializing in TypeScript, React, Next.js, and Node.js — building reliable, high-throughput backend services and polished web frontends.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Minneapolis",
    addressRegion: "MN",
    addressCountry: "US",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "REST APIs",
    "Fastify",
    "Apache Kafka",
    "Kubernetes",
    "Confluent",
    "Azure Event Hub",
    "Microsoft Azure",
    "Amazon Web Services",
    "Terraform",
    "Ansible",
    "MariaDB",
    "MySQL",
    "Microsoft SQL Server",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Microservices",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CompTIA A+",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CompTIA Network+",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CompTIA Linux+",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "CompTIA Security+",
    },
  ],
  sameAs: SAME_AS,
};

/**
 * Schema.org WebSite describing maxwlang.com. Helps establish the site name
 * shown in Google Search results.
 */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Maxwell Lang",
    url: SITE_URL,
  },
};

/**
 * Returns the years of professional software-engineering experience based on
 * the start of Max's industry tenure (Oct 2018). Used in copy that should not
 * go stale.
 */
export function yearsOfExperience(now: Date = new Date()): number {
  const start = new Date("2018-10-01T00:00:00Z");
  const ms = now.getTime() - start.getTime();
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
}

/**
 * Build a Schema.org CreativeWork object describing a portfolio project.
 * Emitted on /projects/[slug] pages so search engines can index the project
 * with rich author/language/year context.
 */
export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  year?: number;
  programmingLanguages?: string[];
  keywords?: string[];
  codeRepository?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Maxwell Lang",
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      name: "Maxwell Lang",
      url: SITE_URL,
    },
    ...(input.year ? { datePublished: `${input.year}-01-01` } : {}),
    ...(input.programmingLanguages?.length
      ? { programmingLanguage: input.programmingLanguages }
      : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.codeRepository ? { codeRepository: input.codeRepository } : {}),
  };
}

/**
 * Build a Schema.org BlogPosting object for a single blog post. Emitted on
 * /blog/[slug] pages.
 */
export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    image: input.image ?? `${SITE_URL}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Maxwell Lang",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Maxwell Lang",
      url: SITE_URL,
    },
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  };
}
