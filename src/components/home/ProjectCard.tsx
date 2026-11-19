import { Project } from "@/data/projects";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "@/components/shared/LinkButton";
import TextPill from "../shared/TextPill";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { slug, title, subtitle, description, tags, image, links, externalOnly } =
    project;

  const maxDescriptionLength = 170;
  const isLongDescription = description.length > maxDescriptionLength;
  const truncatedDescription = isLongDescription
    ? description.slice(0, maxDescriptionLength)
    : description;

  const headingId = `project-${slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="will-change-transform break-inside-avoid bg-foreground dark:bg-slate-900 dark:text-foreground mb-6 sm:mb-8 rounded-lg dark:shadow-lg shadow-xl p-6 flex flex-col max-w-sm transform transition-transform hover:scale-105 hover:shadow-2xl"
    >
      {image && (
        <Image
          src={image}
          alt={`${title} project preview`}
          className="rounded-t-md w-full mb-4 object-cover h-40"
        />
      )}
      <h3 id={headingId} className="text-2xl font-semibold">
        {title}
      </h3>
      {subtitle && (
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {subtitle}
        </h4>
      )}
      <p className="text-sm mb-4">
        {truncatedDescription}
        {isLongDescription && (
          <span className="text-gray-400">…</span>
        )}
      </p>
      {!externalOnly && (
        <Link
          href={`/projects/${slug}`}
          className="text-blue-500 hover:underline text-sm mb-4 self-start"
          aria-label={`Read more about ${title}`}
        >
          Read more →
        </Link>
      )}
      {links && (
        <div className="mb-4 flex flex-wrap gap-2">
          {links.map((link, i) => (
            <LinkButton
              key={i}
              text={link.title}
              href={link.url}
              variant={link.variant ? link.variant : "secondary"}
              icon={link.icon ? link.icon : faLink}
            />
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <TextPill key={i} text={tag} />
          ))}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
