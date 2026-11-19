import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-slate-500 transition-colors 2xl:mx-auto">
      <div className="px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl text-sm leading-relaxed">
          <p>
            Maxwell Lang &mdash; senior software engineer in Minneapolis, MN.
            TypeScript, React, Next.js, and Node.js. Available for senior and
            staff remote engineering roles.
          </p>
          <p className="mt-2 text-xs">
            © {new Date().getFullYear()} Maxwell Lang. All rights reserved.
          </p>
        </div>
        <div className="flex sm:justify-center space-x-5 rtl:space-x-reverse">
          <a
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-slate-400"
            href="https://www.linkedin.com/in/maxwlang"
            aria-label="Maxwell Lang on LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            target="_blank"
            rel="me noopener noreferrer"
            className="hover:text-slate-400"
            href="https://github.com/maxwlang"
            aria-label="Maxwell Lang on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            className="hover:text-slate-400"
            href="mailto:maxwlang@me.com"
            aria-label="Email Maxwell Lang"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
