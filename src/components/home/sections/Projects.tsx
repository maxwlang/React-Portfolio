"use client";

import React, { useState } from "react";
import ScrollToBottom from "@/components/shared/ScrollToBottom";
import projects, { Project } from "@/data/projects";
import ProjectModal from "@/components/home/ProjectModal";
import ProjectCard from "@/components/home/ProjectCard";
import Section from "@/components/shared/Section";

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900"
    >
      <ScrollToBottom scrollToBottomText="Skip Projects">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onViewMore={() => setActiveProject(project)}
            />
          ))}
        </div>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </ScrollToBottom>
    </Section>
  );
};

export default Projects;
