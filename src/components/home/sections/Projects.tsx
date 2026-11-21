import React from "react";
import ScrollToBottom from "@/components/shared/ScrollToBottom";
import projects from "@/data/projects";
import ProjectCard from "@/components/home/ProjectCard";
import Section from "@/components/shared/Section";

const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900"
    >
      <ScrollToBottom scrollToBottomText="Skip Projects">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mb-32">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </ScrollToBottom>
    </Section>
  );
};

export default Projects;
