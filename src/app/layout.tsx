import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Script from "next/script";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HashScroller from "@/components/shared/HashScroll";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maxwell Lang",
  description:
    "Software engineer, tinkerer, and photographer. Breathing information.",
  metadataBase: new URL("https://maxwlang.com"),
  keywords: [
    "Maxwell Lang",
    "Max Lang",
    "Maxwell",
    "Lang",
    "software engineer",
    "tinkerer",
    "photographer",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    images: ["/logo-ml.png"],
  },
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
          src="https://u.maxwlang.com/e45e75e27812"
          data-website-id="db81a484-016d-4c67-8e7c-65b0c99bed54"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
