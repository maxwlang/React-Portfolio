import { Component, createRef } from 'react';
import Head from 'next/head';

import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

import PortfolioHeader from '../components/Portfolio/Header';
import PortfolioSection from '../components/Portfolio/Section';
import PortfolioSocialLink from '../components/Portfolio/SocialLink';
import PortfolioCertification from '../components/Portfolio/Certification';
import PortfolioAccomplishment from '../components/Portfolio/Accomplishment';
import PortfolioProjectAccomplishment from '../components/Portfolio/ProjectAccomplishment';
import PortfolioSectionSubHeader from '../components/Portfolio/Section/SectionSubHeader';

// Projects
import projectIcon3DSThemes from '../public/projects/3dsthemes.jpg';
import projectIconMaagic from '../public/projects/maagic2.jpg';
import projectIconWebTSS from '../public/projects/webtss.jpg';
import projectIconMonthlicon from '../public/projects/monthlicon.jpg';

// Certifications
import certificationIconNetworkPlus from '../public/certifications/network-plus-certified.png';
import certificationIconLinuxPlus from '../public/certifications/linux-plus-certified.png';
import certificationIconAPlus from '../public/certifications/a-plus-certified.png';

{/*
  "The best sort of inner voice" she began,
  "speaks to us in a gentle kind and unhurried way."

  "It should seem like a sympathetic arm were being put
   around our shoulder, by someone who had lived a long
   time, and seen a great many sad things."

   -- https://youtu.be/THjekE5p2aw?t=1328


   Don't sell yourself short, you can do great things.
   -- https://youtu.be/THjekE5p2aw?t=2427
*/}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // refs: {
      //   aboutMe: createRef(),
      //   mySkills: createRef(),
      //   myInterests: createRef(),
      //   myProjects: createRef(),
      //   findMe: createRef(),
      // },
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>Maxwell Lang :: Portfolio</title>
          <meta name="description" content="I&#x27;m Maxwell Lang, a Full Stack Web Developer with 3 years of professional experience." />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Maxwell Lang :: Portfolio" />
          <meta property="og:site_name" content=" M a xwell Lang :: Portfolio" />
          <meta property="og:description" content="I &#x27;m Maxwell Lang, a Full Stack Web Developer with 3 years of professional experience." />
          <meta property="og:url" content="https://www.maxwlang.com/" />
          <meta name="msapplication-TileColor" content="#0de05e"/>
          <meta property="twitter:site" content="@maxwlang" />
          {/* <meta property="og:image" content={ImagemlIcon} /> */}
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <main>
          {/* About Me */}
          <PortfolioHeader
            // id="sectionAboutMe"
            // ref={this.state.refs.aboutMe}
            title="My name is Maxwell Lang"
            subtitle="I'm a Full Stack Web Developer with 3+ years of professional experience."
            // scrollNextChevron={true}
            // scrollNextChevronDestination={this.state.refs.mySkills}
          />

          {/* Certifications */}
          <PortfolioSection
            title="Certifications"
            spaceAround={true}
          >
            <PortfolioCertification
              image={certificationIconLinuxPlus}
              name="CompTIA Linux+"
              tests={[
                'XK0-004',
              ]}
              link="https://verify.comptia.org?code=6V0VJP17585LVK3S"
            />

            <PortfolioCertification
              image={certificationIconNetworkPlus}
              name="CompTIA Network+"
              tests={[
                'N10-007',
              ]}
              link="https://verify.comptia.org?code=ZQFZ23W9S7L0VZKK"
            />

            <PortfolioCertification
              image={certificationIconAPlus}
              name="CompTIA A+"
              tests={[
                '220-902',
                '220-901'
              ]}
              link="https://verify.comptia.org?code=59N15HNVSYL0VXCM"
            />
          </PortfolioSection>

          {/* My Skills */}
          <PortfolioSection
            // id="sectionMySkills"
            // ref={this.state.refs.mySkills}
            title="My Skills"
            subtitle="Programming Languages"
            // scrollNextChevron={true}
            // scrollNextChevronDestination="#sectionMySkills"
          >
            <PortfolioAccomplishment title="NodeJS" subtitle="I am fluent in NodeJS">
              I have programmed in NodeJS at a professional
              level for over 3 years. Most of my personal projects
              are written in NodeJS when it makes sense. <a href="https://github.com/maxwlang/React-Portfolio" target="_blank" rel="noreferrer">This website
              is written in NodeJS (using NextJS)</a>.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="PHP" subtitle="I am also fluent in PHP">
              PHP was the first back-end language I learned, and I used
              it to build dozens of hobby websites as I was learning how
              to program. I have a hobby site I've written in PHP on my <a target="_blank" href="https://github.com/maxwlang" rel="noreferrer">Github</a>.
              Just before I started programming in NodeJS I was using the <a target="_blank" href="https://www.slimframework.com/" rel="noreferrer">Slim
              framework</a> for PHP to power my projects.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="SQL" subtitle="I understand SQL">
              I have a good understanding of MySQL and Microsoft's Transact SQL.
              My SQL experience includes but isn't limited to creating databases,
              tables, and stored procedures.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="C#" subtitle="I have a working understanding of C#">
              I really like the syntax of C#. I have used it in the past to write
              several Windows Forms Apps for work and for personal use. I've also
              explored C# in the Unity Engine, and on the web.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Python" subtitle="I have a good understanding of Python">
              I don't program in Python very often but when I do it's typically
              creating scripts to scrape web content. I have a script that does
              this open sourced on my <a target="_blank" rel="noreferrer" href="https://github.com/maxwlang">Github</a>.
              I'm also starting to dabble in the machine learning area using TensorFlow.
            </PortfolioAccomplishment>

            <PortfolioSectionSubHeader title="Operating Systems, Software &amp; Services" />

            <PortfolioAccomplishment title="Microsoft SQL Server / TSQL" subtitle="I have worked with Microsoft Sql Server in a production setting">
              I have experience creating databases, tables, stored procedures and managing
              basic permissions in Microsoft SQL Server.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="MySQL / MariaDB" subtitle="I typically use MySQL for my hobby projects">
              I prefer to use MySQL over MariaDB, but have used both for hobby projects.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="React / React Native (Expo)" subtitle="I am comfortably learning React">
              I have created several multi-paged mobile applications using React Native through
              Expo. I have also created a few personal projects using React. <a href="https://github.com/maxwlang/React-Portfolio" target="_blank" rel="noreferrer">This portfolio site
              uses React, and is built on the NextJS React framework</a>. I encourage you to take a look!
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Networking" subtitle="I maintain a gigabit internal and external network at home">
              At home I run a PFSense install with several subnets splitting traffic for LAN,
              Virtual Machines and Guest users into seperate networks. My home network is also
              built with cat5e cables I've cut and run myself and using fully managed HP ProCurve
              switches configured through the console.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Datahoarding" subtitle="I maintain a 30TB FreeNAS server at home">
              I use FreeNAS to make large amounts of storage accessable throughout my home network.
              My computers at home connect to the NAS to allow quick access to large amounts of data.
              Multiple devices and service ranging from Plex to Security cameras also use this storage
              to hold data.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Virtualization &amp; Docker" subtitle="The majority of services I run at home are virtualized with Hyper-V">
              I host a variety of permanent and temparary virtual machines at home with Microsoft Hyper-V.
              The virtual machines vary from headless Linux installs to Windows desktop installs. Some of my
              virtualized services include Plex, FreeNAS, a NGINX web server, and a MySQL database server.
              I also have basic working knowledge of Docker and Docker Compose. My primary experience with
              Docker comes from CI/Pipelines integration on Atlassian's BitBucket.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Server Administration" subtitle="I work well in several server environments">
              I have used and administrated Windows Server in a professional environment for over 3 years.
              I also have around 9 years of experience working in the terminal of Debian-based Linux servers.
            </PortfolioAccomplishment>

            <PortfolioSectionSubHeader title="Other Skills" />

            <PortfolioAccomplishment title="Ethernet Cabling">
              I have experience creating my own CAT5e ethernet cabling. All the networking hardware in my home
              uses ethernet cables I have created myself.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Soldering" subtitle="I can successfully solder on small electronics">
              I've soldered modchips into video game consoles, repaired damaged computer components, and
              soldered to my own custom designed PCBs.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Bug Bounties &amp; Reverse Engineering">
              I have earned payouts for responsibly disclosing software vulnerabilities. I have experience
              reverse engineering iOS applications and system executables. I have created iOS operating system
              and application extensions called "Tweaks" that execute at runtime using dumped header files. I
              have good experience reverse engineering web applications.
            </PortfolioAccomplishment>
          </PortfolioSection>

          {/* My Interests */}
          {/* TODO: Add images */}
          <PortfolioSection
            // ref={this.state.refs.myInterests}
            title="My Interests &amp; Hobbies"
            subtitle="Interests and hobbies I like to spend my time on"
            // scrollNextChevron={true}
            // scrollNextChevronDestination="#sectionMySkills"
          >
            <PortfolioAccomplishment title="Computer Programming">
              Web development, scripting, video game mods, apps, automation and more.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Reverse Engineering">
              iOS tweak development and website vulnerability disclosure.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Homebrew">
              Custom firmwares, video game mods, cheats, homebrew software and iOS jailbreaking.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Music">
              Using the Ableton Live DAW and a midi keyboard to produce music. Mixing music with Traktor Pro 3
              and Traktor Kontrol.
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Home Server &amp; Network Administration">
              I maintain and operate a gigabit internal network and homelab. My homelab consists of a PFSense firewall &amp; a HP Procurve Managed Switch, 30TB NAS, Microsoft Hyper-V,
              Plex, PiHole, and more!
            </PortfolioAccomplishment>

            <PortfolioAccomplishment title="Video Games">
              I love Nintendo consoles, PC gaming, and VR. I also occasionally host video game servers.
            </PortfolioAccomplishment>

          </PortfolioSection>

          {/* My Projects */}
          <PortfolioSection
            // ref={this.state.refs.myProjects}
            title="My Projects"
            subtitle="Some projects that I've worked on"
            // scrollNextChevron={true}
            // scrollNextChevronDestination="#sectionMySkills"
          >
            {/* 3DSThemes */}
            <PortfolioProjectAccomplishment
              title="3DSThemes"
              subtitle="A community-oriented console homebrew website written in PHP"
              src={projectIcon3DSThemes.src}
              needsShowMore={true}
              links={[
                {
                  href:'https://web.archive.org/web/20150923145948/http://www.3dsthemes.com:80/',
                  title: 'View on Wayback',
                }
              ]}
            >
              <p>
                3DSThemes was a website that I worked on with a small team.
                I handled the backend programming in PHP, the MySQL database,
                the Debian server administration, and some of the front-end
                development and design. This was a project I joined after its
                creation, and left at a later point. When it was active, the
                website reached a user count of over 1,000, an uploaded theme
                (content) count of over 2,500, and a total download count of
                over 335,000 themes.
              </p>
              <p>
                At its peak, the website surpassed Nintendo’s official 3DS Themes
                page to become the top ranking result in Google search. The website
                featured a user account system, user profiles, a theme upload and
                download system, a tagging and content search system, and a content gallery.
                Development of a native Nintendo 3DS homebrew application to download themes
                was in development by another party but never completed. The website succumbed
                to a SQL injection attack that wiped the database and not too long after the
                website closed down.
              </p>
              <p>
                With this project, at the age of 17, I learned website management and development
                skills for a website with high traffic. After this website I also prioritized writing
                safer and more secure code, as well as the importance of automatic scheduled backups.
                Attached to this post is an archive of the website at its peak.
              </p>
            </PortfolioProjectAccomplishment>

            {/* Maagic */}
            <PortfolioProjectAccomplishment
              title="Maagic"
              subtitle="A passion project website shared between friends and trusted people, written in PHP"
              src={projectIconMaagic.src}
              needsShowMore={true}
              links={[
                {
                  href:'https://web.archive.org/web/20181229141001/http://maagic.pw/',
                  title: 'View on Wayback',
                }
              ]}
            >
              <p>
                Maagic was a website I built for my friends and I to have
                screenshot hosting without any real limitations. Maagic was
                attached to my NAS of 30TB to allow a very large amount of
                data to be uploaded without really running into any constraints.
                It initially started out as a modification of the Puush screenshot client,
                used by running hex-edited binaries to point to Maagic servers. Later,
                it was changed to become an endpoint for the screenshot software ShareX.
              </p>
              <p>
                Towards the end of it's lifetime it became semi-private and invite only.
                At it's peak, Maagic served over 12,100 files and maintained just below 20
                users invited to the platform. It also contained several API endpoints for
                first party (an iOS jailbreak tweak that interfaced with the system) and third
                party (Puush, ShareX) screencapture clients.
              </p>
              <p>
                Traffic for served content was larger than I expected, but not easy to monetize
                due to resource links being direct links.
              </p>
            </PortfolioProjectAccomplishment>

            {/* WebTSS */}
            <PortfolioProjectAccomplishment
              title="WebTSS"
              subtitle="A community-oriented open-source website in the iOS jailbreak scene written in PHP"
              src={projectIconWebTSS.src}
              links={[
                {
                  href:'https://github.com/maxwlang/WebTSS',
                  title: 'View on Github',
                }
              ]}
            >
              <p>
                WebTSS was my attempt at making an open source (MIT) website
                that saves <a href="https://en.wikipedia.org/wiki/SHSH_blob" target="_blank" rel="noreferrer">iOS SHSH blobs</a>, useful for restoring an iPhone after
                Apple disallows downgrading to a specific firmware. This project
                is now defunct, but at the time it gained some small attention and
                a few community pull requests.
              </p>
            </PortfolioProjectAccomplishment>

            {/* Monthlicon */}
            <PortfolioProjectAccomplishment
              title="Monthlicon"
              subtitle="An iOS jailbreak tweak written in Objective-C"
              src={projectIconMonthlicon.src}
              links={[
                {
                  href:'https://github.com/maxwlang/Monthlicon',
                  title: 'View on Github',
                },
                {
                  href:'https://www.idownloadblog.com/2018/05/31/monthlicon/',
                  title: 'View Article',
                }
              ]}
            >
              <p>
                Monthlicon is an iOS jailbreak tweak that modified the system
                home screen ("SpringBoard") to display the current month as the
                Calendar app's display label. While simple, this tweak was downloaded
                over 10,000 times from the BigBoss repository in the Cydia package manager,
                and has an article written about it.
              </p>
            </PortfolioProjectAccomplishment>

            {/* View More */}
            {/* <Col xs={12} className={styles.projectsViewMoreContainer}>
              <Link href="/projects" passHref>
                <Button size="lg" color="primary">
                  View More
                </Button>
              </Link>
            </Col> */}
          </PortfolioSection>

          {/* Find Me */}
          {/* TODO: Center these */}
          <PortfolioSection
            // ref={this.state.refs.findMe}
            title="Find Me"
            subtitle="Here's where we can connect"
            spaceAround={true}
          >
            <PortfolioSocialLink
              icon={faLinkedin}
              title="LinkedIn"
              subtitle="Connect with me on LinkedIn"
              links={[
                {
                  href: 'https://www.linkedin.com/in/maxwlang/',
                  title: 'LinkedIn',
                }
              ]}
            />
            <PortfolioSocialLink
              icon={faGithub}
              title="GitHub"
              subtitle="Follow me on GitHub"
              links={[
                {
                  href: 'https://github.com/maxwlang',
                  title: 'GitHub',
                }
              ]}
            />
            <PortfolioSocialLink
              icon={faBlog}
              title="Blog"
              subtitle="Subscribe to my blog"
              links={[
                {
                  href: 'https://blog.maxwlang.com/',
                  title: 'Blog',
                }
              ]}
            />
            <PortfolioSocialLink
              icon={faTwitter}
              title="Twitter"
              subtitle="Follow me on Twitter"
              links={[
                {
                  href: 'https://twitter.com/maxwlang/',
                  title: 'Twitter',
                }
              ]}
            />
          </PortfolioSection>
        </main>
      </>
    );
  }
}
