import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-slate-500 transition-colors 2xl:mx-auto">
      <div className="px-4 py-6 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © {new Date().getFullYear()} Maxwell Lang. All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
          <a
            target="_blank"
            className="hover:text-slate-400"
            href="https://www.linkedin.com/in/maxwlang"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            target="_blank"
            className="hover:text-slate-400"
            href="https://github.com/maxwlang"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="sr-only">GitHub</span>
          </a>
          <a target="_blank" className="hover:text-slate-400" href="#">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
