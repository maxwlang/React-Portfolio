import { LinkButtonProps } from "@/components/shared/LinkButton";
import { StaticImageData } from "next/image";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import images from "@/images";

export interface Link {
  title: string;
  url: string;
  variant?: LinkButtonProps["variant"];
  icon?: LinkButtonProps["icon"];
}

export interface Project {
  /** URL-safe identifier used for /projects/[slug] routes. */
  slug: string;
  title: string;
  subtitle?: string;
  /** Short description used on cards and meta. Keep ≤170 chars to avoid truncation in cards. */
  description: string;
  /** Long-form prose for the dedicated detail page. Plain string; rendered as a paragraph. */
  longDescription?: string;
  /** Year the work was done or last updated. Used for sitemap + structured data. */
  year?: number;
  /** Primary programming language(s). Surfaced on detail pages and in JSON-LD. */
  programmingLanguages?: string[];
  tags: string[];
  image?: StaticImageData;
  links?: Link[];
  /** Optional gallery, surfaced on the detail page. */
  gallery?: StaticImageData[];
  /** When true, this card links to GitHub instead of a detail page (e.g. catch-all "more on GitHub"). */
  externalOnly?: boolean;
}

const projects: Project[] = [
  {
    slug: "denon-supported",
    title: "Denon Supported",
    subtitle: "Sonos Port audio controls for Denon receivers",
    year: 2025,
    programmingLanguages: ["TypeScript"],
    tags: ["Sonos", "TypeScript", "Audio", "2025"],
    image: images.cardDenonSupported,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/denon-supported",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "Bridges the Sonos Port's audio controls to Denon receivers that don't natively support passthrough. Built in TypeScript after my own AVR refused to play nicely with the Port — the integration parses Sonos events and translates them into the right IR/serial commands so volume, mute, and source switching just work.",
    longDescription:
      "Denon Supported is a small TypeScript service that closes a real gap in my own home theater. The Sonos Port is fantastic at what it does, but its audio control passthrough only works with a curated list of partner receivers, and my Denon AVR isn't on that list — meaning volume, mute, and source switching from the Sonos app simply did nothing. I reverse-engineered the relevant Sonos UPnP and notification events, mapped them to the Denon receiver's serial/IR command set, and wrapped the whole thing in a long-running Node service. The result: every Sonos client (mobile, desktop, voice assistant) controls my Denon AVR as if it were a first-class partner. The code intentionally stays small, well-typed, and dependency-light so it's easy to fork and adapt to other unsupported AVRs.",
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    subtitle: "Personal portfolio site built with Next.js 16 and React 19",
    year: 2025,
    programmingLanguages: ["TypeScript"],
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP", "2025"],
    image: images.cardPortfolio,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/portfolio",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "The site you're reading. Built with Next.js 16, React 19, TypeScript, and Tailwind, with GSAP-driven scroll scenes and Framer Motion micro-interactions. Designed mobile-first, statically rendered, and tuned for fast loads and accessible markup.",
    longDescription:
      "maxwlang.com is a static-first Next.js 16 site running on the App Router with React 19. The visual personality comes from GSAP scroll-pinned sequences in the About section and Framer Motion shared-layout transitions in the Hobbies grid. I lean into the platform: edge-rendered Open Graph images, a typed metadata + JSON-LD layer for SEO, route-level sitemaps, and accessibility-first markup (semantic landmarks, real focus states, descriptive alt text, and decorative images marked aria-hidden). Everything lives in TypeScript with strict types end to end, including the project and blog data layers.",
  },
  {
    slug: "ai-mail",
    title: "AI Mail",
    subtitle: "A scammer-baiting tool that wastes their time, not yours",
    year: 2024,
    programmingLanguages: ["TypeScript"],
    tags: ["TypeScript", "AI", "SMTP", "IMAP", "MariaDB", "2024"],
    image: images.cardAiMail,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/ai-mail",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "A fun TypeScript project that turns the tables on email scammers. Hooks SMTP and IMAP up to a ChatGPT-driven persona that responds in slow, rambling, almost-cooperative threads — diverting scammers' time and resources away from real victims while producing genuinely funny exchanges.",
    longDescription:
      "AI Mail is a TypeScript service that sits behind a throwaway mailbox and impersonates an enthusiastic-but-confused mark. It polls IMAP for new scam attempts, classifies them, and replies via SMTP with a slow-rolling persona generated by an OpenAI model. Threads are persisted in MariaDB so the persona's memory and tone stay consistent across hundreds of replies, and rate limiting keeps the cadence believably human. The point is twofold: a study in conversational state management with LLMs, and a small bit of public-good chaos engineering — every minute a scammer spends arguing with an AI is a minute they aren't spending on a real victim.",
  },
  {
    slug: "harbinger",
    title: "Harbinger",
    subtitle: "Flexible RSS-to-Discord webhook bridge",
    year: 2025,
    programmingLanguages: ["TypeScript"],
    tags: ["TypeScript", "Automation", "Discord", "2025"],
    image: images.cardHarbinger,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/harbinger",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "A flexible RSS-to-Discord webhook utility with multi-feed support and custom formatting. Built it after every existing option was either too restrictive or charged $8+/month with feed caps — Harbinger is self-hosted, free, and configurable enough to fit whatever feeds you actually care about.",
    longDescription:
      "Harbinger is a small, self-hosted TypeScript service that polls any number of RSS/Atom feeds and pushes new items to Discord webhooks with per-feed templates. Each feed gets its own polling interval, formatter, and target webhook, with deduplication backed by a tiny on-disk store so restarts don't re-spam channels. I wrote it because the SaaS options were either feature-gated or charging serious money for what amounts to a few hundred lines of glue. The codebase is intentionally readable — typed config, swappable formatters, and a clear module boundary between fetching, parsing, and dispatching — so anyone can fork it and add a new feed shape in an afternoon.",
  },
  {
    slug: "openswc-fusion",
    title: "OpenSWC: Fusion",
    subtitle:
      "Arduino interface bridging Ford Fusion steering wheel controls to an aftermarket head unit",
    year: 2024,
    programmingLanguages: ["C++"],
    tags: ["Arduino", "C++", "Electronics", "PCB Design", "2024"],
    image: images.cardOpenSWC,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/arduino-swc-ford-fusion",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "An Arduino-based interface that bridges Ford Fusion steering wheel controls to an aftermarket head unit. Started as a fork after a purchased adapter failed to deliver — written in C++, prototyped on Arduino, then promoted to a custom-designed PCB. Currently installed and in daily use in my own car.",
    longDescription:
      "OpenSWC: Fusion started as a fork of an existing project after a $60 commercial adapter failed to do what the box promised. The hardware sniffs the Ford Fusion's analog steering-wheel resistance ladder, decodes button presses, and emits the right SWC signal pattern for a Pioneer aftermarket head unit. I rewrote the firmware in C++ for clarity, prototyped on a breadboarded Arduino Nano, then designed a small custom PCB so the install would survive the engine bay's heat and vibration. It's been in daily-driver service in my own car for months — the ergonomic difference between thumbing the wheel and reaching for the head unit at 70 mph is the entire point.",
  },
  {
    slug: "monthlicon",
    title: "Monthlicon",
    subtitle: "iOS jailbreak tweak that updates the Calendar icon's month label",
    year: 2018,
    programmingLanguages: ["Objective-C"],
    tags: ["Objective-C", "iOS", "Jailbreak", "2018"],
    image: images.cardMonthlicon,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/Monthlicon",
        variant: "primary",
        icon: faGithub,
      },
      {
        title: "Article Feature",
        url: "https://www.idownloadblog.com/2018/05/31/monthlicon/",
        icon: faBook,
      },
    ],
    description:
      "An iOS jailbreak tweak that hooks SpringBoard to keep the Calendar icon's month label always current. Simple in scope but well-received — over 10,000 downloads from the BigBoss repo via Cydia, and an editorial feature on iDownloadBlog.",
    longDescription:
      "Monthlicon is a jailbreak tweak for iOS that hooks SpringBoard via Theos/Logos and updates the Calendar app icon every time the visible month changes — a small detail Apple's stock icon doesn't do unless the app is opened. Tiny in scope, but it scratched a real itch and ended up shipped via the BigBoss Cydia repository where it picked up 10,000+ downloads and a write-up on iDownloadBlog. It was my first real exposure to runtime hooking, dynamic library injection, and packaging C/Objective-C tooling for distribution to strangers — formative stuff for a teenager who would go on to build a career around shipping software other people depend on.",
  },
  {
    slug: "webtss",
    title: "WebTSS",
    subtitle:
      "Open-source iOS SHSH blob saver from the early jailbreak community",
    year: 2016,
    programmingLanguages: ["PHP"],
    tags: ["PHP", "MySQL", "Website", "Open Source", "2016"],
    image: images.cardWebtss,
    links: [
      {
        title: "GitHub Repository",
        url: "https://github.com/maxwlang/WebTSS",
        variant: "primary",
        icon: faGithub,
      },
    ],
    description:
      "An MIT-licensed PHP project that saved iOS SHSH blobs — the cryptographic tickets needed to restore iPhones after Apple stopped signing older firmware. Picked up traction in the jailbreak community during its run and received a handful of community pull requests.",
    longDescription:
      "WebTSS was an MIT-licensed PHP web app for saving SHSH blobs — Apple's per-device signing tickets that, once Apple rotates them, are the only thing standing between you and being permanently locked out of restoring an older iOS firmware. The project hit a sweet spot in the jailbreak community: low-friction, open-source, no vendor lock-in. It collected a small but real flow of community pull requests, taught me a lot about authenticated API automation against a vendor that actively didn't want you talking to it, and served as my first open-source maintenance role.",
  },
  {
    slug: "maagic",
    title: "Maagic",
    subtitle:
      "Invite-only screenshot and file sharing platform backed by 44TB of NAS storage",
    year: 2018,
    programmingLanguages: ["PHP"],
    tags: ["PHP", "MySQL", "ShareX", "Website", "2018"],
    image: images.cardMaagic,
    description:
      "A private screenshot host I built for friends, backed by 44TB of NAS storage so storage caps were never a concern. Started life as a hex-edited Puush client redirecting uploads, then evolved into a proper ShareX endpoint. Peaked at ~20 invited members and 12,100+ hosted files.",
    longDescription:
      "Maagic was a private, invite-only screenshot and file host I ran out of my homelab for a small group of friends. The first iteration was a hex-edited Puush client pointed at my own server — useful but fragile. The second was a real ShareX endpoint with a PHP backend, MySQL metadata store, and 44TB of NAS storage behind it so quotas were never the bottleneck. At its peak it served around twenty invited members and held 12,100+ files. The interesting parts ended up being the boring parts: hash-based dedup, signed URLs, abuse handling, and keeping a self-hosted service quietly reliable for friends who'd never tolerate downtime from a paid product.",
  },
  {
    slug: "3dsthemes",
    title: "3DSThemes",
    subtitle: "Community homebrew theme site that out-ranked Nintendo on Google",
    year: 2015,
    programmingLanguages: ["PHP"],
    tags: ["PHP", "MySQL", "Linux", "Website", "2015"],
    image: images.card3dsThemes,
    links: [
      {
        title: "Archived Website",
        url: "https://web.archive.org/web/20150923145948/http://www.3dsthemes.com:80/",
        variant: "primary",
      },
    ],
    description:
      "Backend, database, and Debian server admin for a community-run Nintendo 3DS theme site. Grew to 1,000+ registered users, 2,500+ uploaded themes, and 335,000+ downloads — and at its peak ranked above Nintendo's own page on Google for 3DS themes.",
    longDescription:
      "3DSThemes was a community-run repository for homebrew Nintendo 3DS themes. I owned the backend, the MySQL schema, and the Debian server admin while a co-founder handled the front end and community moderation. The site grew to 1,000+ registered users, 2,500+ uploaded themes, and 335,000+ downloads, and at its peak it ranked above Nintendo's own page in Google search results for the relevant queries — a teenage SEO accident that taught me, very early, what 'real' production traffic actually looks like and why uptime, schema migrations, and abuse handling are so much harder than the demo on your laptop.",
  },
  {
    slug: "more-on-github",
    title: "There's more on GitHub.",
    subtitle: "Open-source experiments, libraries, and side projects.",
    description:
      "I keep a steady stream of side projects on GitHub — utilities, experiments, and the odd reverse-engineering rabbit hole. Have a look around.",
    tags: [],
    externalOnly: true,
    links: [
      {
        title: "GitHub Profile",
        url: "https://github.com/maxwlang",
        variant: "primary",
        icon: faGithub,
      },
    ],
  },
];

export default projects;
