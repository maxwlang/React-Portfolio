import { Project } from "@/data/projects";
import { faLink, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import LinkButton from "@/components/shared/LinkButton";
import TextPill from "@/components/shared/TextPill";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { title, subtitle, description, tags, image, links } = project;

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-foreground dark:bg-slate-900 dark:text-foreground rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                </button>
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    className="rounded-lg w-full mt-6 mb-4 object-cover h-60"
                  />
                )}
                <DialogTitle as="h3" className="text-3xl font-bold mb-2">
                  {title}
                </DialogTitle>
                {subtitle && (
                  <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {subtitle}
                  </h4>
                )}
                <p className="text-sm pr-10 text-justify">{description}</p>
                {links && (
                  <div className="flex flex-wrap gap-2 mt-6">
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
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, i) => (
                    <TextPill key={i} text={tag} />
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectModal;
