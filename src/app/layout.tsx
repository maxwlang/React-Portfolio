import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Script from "next/script";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HashScroller from "@/components/shared/HashScroll";
import { personJsonLd, websiteJsonLd, SITE_URL } from "@/lib/jsonld";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

const SITE_DESCRIPTION =
  "Maxwell Lang is a senior software engineer in Minneapolis specializing in TypeScript, React, Next.js, and Node.js. Available for senior and staff remote engineering roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maxwell Lang — Senior Software Engineer (TypeScript, React, Node.js)",
    template: "%s | Maxwell Lang",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Maxwell Lang",
  authors: [{ name: "Maxwell Lang", url: SITE_URL }],
  creator: "Maxwell Lang",
  publisher: "Maxwell Lang",
  category: "technology",
  keywords: [
    "Maxwell Lang",
    "Max Lang",
    "senior software engineer",
    "staff software engineer",
    "TypeScript engineer",
    "React engineer",
    "Next.js developer",
    "Node.js engineer",
    "full-stack engineer",
    "backend engineer",
    "remote software engineer",
    "Minneapolis software engineer",
    "Kafka",
    "Kubernetes",
    "GraphQL",
    "microservices",
    "event-driven architecture",
    "distributed systems",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Maxwell Lang",
    title:
      "Maxwell Lang — Senior Software Engineer (TypeScript, React, Node.js)",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo-ml.png",
        width: 512,
        height: 512,
        alt: "Maxwell Lang monogram logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Maxwell Lang — Senior Software Engineer (TypeScript, React, Node.js)",
    description: SITE_DESCRIPTION,
    images: ["/logo-ml.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

{
  /*
  "The best sort of inner voice" she began,
  "speaks to us in a gentle kind and unhurried way."

  "It should seem like a sympathetic arm were being put
  around our shoulder, by someone who had lived a long
  time, and seen a great many sad things."

  -- https://youtu.be/THjekE5p2aw?t=1328


  Don't sell yourself short, you can do great things.
*/
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HashScroller offsetY={50} delay={0.5} />
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          src="https://u.maxwlang.com/e45e75e27812"
          data-website-id="db81a484-016d-4c67-8e7c-65b0c99bed54"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
