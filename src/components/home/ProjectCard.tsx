import { Project } from "@/data/projects";
import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import LinkButton from "@/components/shared/LinkButton";
import TextPill from "../shared/TextPill";

interface ProjectCardProps {
  project: Project;
  onViewMore: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewMore }) => {
  const { title, subtitle, description, tags, image, links } = project;

  const maxDescriptionLength = 170;
  const isLongDescription = description.length > maxDescriptionLength;
  const truncatedDescription = isLongDescription
    ? description.slice(0, maxDescriptionLength)
    : description;

  return (
    <div className="will-change-transform break-inside-avoid bg-foreground dark:bg-slate-900 dark:text-foreground mb-6 sm:mb-8 rounded-lg dark:shadow-lg shadow-xl p-6 flex flex-col max-w-sm transform transition-transform hover:scale-105 hover:shadow-2xl">
      {image && (
        <Image
          src={image}
          alt={title}
          className="rounded-t-md w-full mb-4 object-cover h-40"
        />
      )}
      <h3 className="text-2xl font-semibold">{title}</h3>
      {subtitle && (
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {subtitle}
        </h4>
      )}
      <p className="text-sm mb-4">
        {truncatedDescription}
        {isLongDescription && (
          <>
            <span className="text-gray-400">...</span>{" "}
            <button
              onClick={onViewMore}
              className="text-blue-500 hover:underline text-sm inline-flex items-center"
            >
              View More{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="ml-1"
              />
            </button>
          </>
        )}
      </p>
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
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <TextPill key={i} text={tag} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
