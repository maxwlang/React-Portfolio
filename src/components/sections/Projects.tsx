"use client";

import React, { useState } from "react";
import ScrollToBottom from "@/components/ScrollToBottom";
import projects, { Project } from "@/data/projects";
import ProjectModal from "@/components/shared/ProjectModal";
import ProjectCard from "@/components/shared/ProjectCard";
import Section from "@/components/shared/Section";

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <ScrollToBottom scrollToBottomText="Skip Projects">
        <div className="max-w-5xl w-full">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Projects
          </h2>

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
        </div>
      </ScrollToBottom>
    </Section>
  );
};

export default Projects;
