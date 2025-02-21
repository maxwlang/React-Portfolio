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
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  image?: StaticImageData;
  links?: Link[];
}

const projects: Project[] = [
  // {
  //   title: "QuickShare",
  //   subtitle:
  //     "A fast, user-friendly file-sharing service that seamlessly syncs and shares files from local directories or network shares without needing APIs.",
  //   tags: [
  //     "TypeScript",
  //     "React",
  //     "NextJS",
  //     "Tailwind CSS",
  //     "MariaDB",
  //     "Website",
  //   ],
  //   image: images.cardQuickShare,
  //   description:
  //     "QuickShare is a fast, user-friendly file-sharing service designed to support multiple domains, custom branding, and seamless integration with existing infrastructure. Built on a filesystem-based storage backend, QuickShare makes it effortless to sync and share files by directly utilizing local operating system directories or network shares. This approach ensures that files in the designated directories are always up-to-date and ready for download, making it particularly valuable for scenarios involving automated tasks that generate files—such as logs or reports. There's no need to rely on APIs to upload your data; simply place your files in the designated directory, and they will instantly be accessible for sharing.",
  // },
  {
    // Complete
    title: "This Portfolio",
    subtitle: "A personal portfolio website showcasing my work and projects",
    tags: ["React", "TypeScript", "NextJS", "Tailwind CSS", "Website", "2025"],
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
      "This portfolio website was developed to showcase my work and projects. It was built using modern web technologies like TypeScript, NextJS, React, and Tailwind CSS, and features a responsive design that adapts to various screen sizes.",
  },
  {
    // Complete
    title: "AI Mail",
    subtitle:
      "An fun tool designed to combat scammers by turning the tables on them",
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
      "AI Mail is a tool designed to combat scammers by turning the tables on them. Leveraging ChatGPT, it responds to scam emails in a way that wastes the scammers' time, engaging them in lengthy and strange conversations. With SMTP and IMAP integration, AI Mail sends carefully crafted replies that appear gullible, eager, and cooperative, while sharing only fake information. This approach diverts scammers' attention and resources, reducing the harm they can cause to others, all while creating humorous and entertaining exchanges.",
  },
  // {
  //   title: "HomeLab",
  //   subtitle: "A collection of home server projects and services",
  //   tags: [
  //     "Kubernetes",
  //     "Docker",
  //     "Argo",
  //     "Linux",
  //     "Virtual Machines",
  //     "Systems",
  //     "ongoing",
  //     "2023",
  //   ],
  //   image: images.cardHomeLab,
  //   links: [
  //     {
  //       title: "Argo Repository",
  //       url: "https://github.com/maxwlang/argocd-homelab",
  //       icon: faGithub,
  //       variant: "primary",
  //     },
  //   ],
  //   description:
  //     "My homelab is a collection of home server projects and services that I maintain and operate. It includes a Kubernetes cluster, Docker containers, Argo Workflows, virtual machines, and various Linux-based systems. The homelab serves as a testing ground for new technologies and software, enabling me to experiment with different configurations, applications, and services. By managing the homelab, I gain valuable experience in system administration, networking, security, and automation, while also supporting my personal projects and interests.",
  // },
  {
    // Complete
    title: "Harbinger",
    subtitle: "A flexible RSS Feed to Discord webhook translation utility",
    tags: ["Typescript", "Automation", "2025"],
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
      "Harbinger is a utility that translates RSS feeds to Discord webhooks. It is designed to be flexible and easy to use, with support for multiple feeds, webhooks, and custom formatting. I built Harbinger after being dissatisfied with current options on the internet, many services were not flexible enough to support the RSS feeds I was interested in tracking, others cost 8 dollars a month or more, and restricted the amount off feeds you could monitor. Harbinger can be used to automate the delivery of news, updates, and notifications to Discord servers, enabling users to stay informed and up to date on news they care about.",
  },
  {
    // Complete
    title: "OpenSWC: Fusion",
    subtitle:
      "An Arduino interface that bridges the ford fusion Steering Wheel Controls to an aftermarket head unit",
    tags: ["Arduino", "C++", "Electronics", "2024"],
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
      "Initially starting as a simple repository fork, OpenSWC: Fusion is a project that interfaces the Ford Fusion's steering wheel controls with an aftermarket head unit. I started working on it after a purchased adapter that claimed support didn't work. This project was written in C++, and prototyped on the Arduino platform. After building a successful prototype, I designed a custom PCB to house the components and make the project more professional. This project is currently in use in my vehicle",
  },
  {
    // Complete
    title: "Monthlicon",
    subtitle: "An iOS jailbreak tweak written in Objective-C",
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
      "Monthlicon is an iOS jailbreak tweak that enhances the system's home screen (SpringBoard) by dynamically updating the Calendar app's display label to reflect the current month. Despite its simplicity, the tweak achieved significant popularity, with over 10,000 downloads from the BigBoss repository via the Cydia package manager. Additionally, its functionality was recognized and featured in an article.",
  },
  {
    // Complete
    title: "WebTSS",
    subtitle:
      "A community-oriented open-source website in the iOS jailbreak scene written in PHP",
    tags: ["PHP", "MySQL", "Website", "2016"],
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
      "WebTSS was an open-source project I developed under the MIT license, designed to save iOS SHSH blobs—a critical tool for restoring iPhones after Apple discontinues support for downgrading to specific firmware versions. Although the project is now defunct, it garnered some attention within the community during its active period and received a few contributions through community pull requests.",
  },
  {
    // Complete
    title: "Maagic",
    subtitle:
      "A file sharing and screenshot website shared between friends, written in PHP",
    tags: ["PHP", "MySQL", "Website", "2018"],
    image: images.cardMaagic,
    description:
      "Maagic was a website I developed to provide screenshot hosting for my friends and myself, with virtually no limitations on storage or usage. The platform leveraged my NAS—at the time totaling 44TB, enabling a significant amount of data to be uploaded without encountering storage constraints. Initially, Maagic operated as a modified version of the Puush screenshot client, utilizing hex-edited binaries to redirect uploads to Maagic's servers. Later, it transitioned into an endpoint for the widely used screenshot tool ShareX. In its later stages, Maagic became a semi-private, invite-only platform. At its peak, it hosted over 12,100 files and supported a user base of approximately 20 invited members.",
  },
  {
    // Complete
    title: "3DSThemes",
    subtitle: "A community-oriented console homebrew website written in PHP",
    tags: ["PHP", "MySQL", "Website", "2015"],
    image: images.card3dsThemes,
    links: [
      {
        title: "Archived Website",
        url: "https://web.archive.org/web/20150923145948/http://www.3dsthemes.com:80/",
        variant: "primary",
      },
    ],
    description:
      "3DSThemes was a collaborative project I contributed to as part of a small team. My primary responsibilities included backend programming in PHP, managing the MySQL database, administering the Debian server, and assisting with front-end development and design. During its active period, the website achieved significant growth, amassing over 1,000 registered users, hosting more than 2,500 uploaded themes, and surpassing 335,000 total theme downloads. At its peak, 3DSThemes outranked Nintendo's official 3DS Themes page to become the top result in Google search.",
  },
  {
    title: "There's more to see!",
    subtitle: "Check out my GitHub for more projects.",
    description:
      "I have many more projects on my GitHub profile. Feel free to check them out!",
    tags: [],
    // image: images.cardGithub,
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
