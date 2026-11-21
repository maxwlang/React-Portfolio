export interface SkillCategory {
  category: string;
  items: string[];
}

const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Node.js", "Python", "C#", "SQL"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      "Fastify",
      "Express",
      "GraphQL",
      "REST",
      "gRPC",
      "Microservices",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "Data & Streaming",
    items: [
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "MySQL / MariaDB",
      "Microsoft SQL Server",
      "MongoDB",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Ansible",
      "Linux",
      "Proxmox",
      "On-Premise",
    ],
  },
  {
    category: "Practices",
    items: [
      "CI/CD",
      "Observability",
      "System Design",
      "Code Review",
      "Mentorship",
      "Technical Writing",
      "Incident Response",
    ],
  },
];

export default skills;
