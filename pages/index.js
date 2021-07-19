import Head from 'next/head';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import PortfolioHeader from '../components/PortfolioHeader';
import PortfolioSection from '../components/PortfolioSection';
import PortfolioAccomplishment from '../components/PortfolioAccomplishment';

import styles from '../styles/Home.module.scss';

// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import Image from 'next/image';
// import mlIcon from '../public/ml.png';
// import { faGem } from '@fortawesome/free-regular-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import 'react-pro-sidebar/dist/css/styles.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Maxwell Lang :: Portfolio</title>
        <meta name="description" content="I&#x27;m Maxwell Lang, a Full Stack Web Developer with 3 years of professional experience." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Maxwell Lang :: Portfolio" />
        <meta property="og:site_name" content="Maxwell Lang :: Portfolio" />
        <meta property="og:description" content="I&#x27;m Maxwell Lang, a Full Stack Web Developer with 3 years of professional experience." />
        {/* <meta property="og:image" content={ImagemlIcon} /> */}
        <meta property="og:url" content="https://www.maxwlang.com/" />
        {/* <meta property="twitter:site" content="@maxwlang" /> */}
        <meta name="msapplication-TileColor" content="#0de05e"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-24SMZDF52M"></script>
      </Head>

      <main>
        <PortfolioSection
          title="About Me"
          scrollNextChevron={true}
        >
          <PortfolioHeader />
        </PortfolioSection>

        <PortfolioSection
          title="My Skills"
          subtitle="Programming Languages"
          scrollNextChevron={true}
        >
          {/* List a few languages */}
          <PortfolioAccomplishment
            title="NodeJS"
            subtitle="I am fluent in NodeJS"
          >
            {/* Content of the accomplishment can go here */}
          </PortfolioAccomplishment>
        </PortfolioSection>

        <PortfolioSection
          title="My Interests &amp; Hobbies"
          subtitle="Interests and hobbies I like to spend my time on"
          scrollNextChevron={true}
        >
          {/* list a few interests */}
        </PortfolioSection>

        <PortfolioSection
          title="My Projects"
          subtitle="Some projects that I've worked on"
          scrollNextChevron={true}
        >
          {/* list a few smaller projects */}
          <Button onClick={() => {/* Would take user to /projects to enumerate */}}>View More</Button>
        </PortfolioSection>

        <PortfolioSection
          title="Find Me"
          subtitle="Here's where we can connect"
          scrollNextChevron={true}
        >
          {/* linkedin, github */}
        </PortfolioSection>
      </main>

      {/* <div> */}
        {/* <ProSidebar>
          <Menu iconShape="square">
            <MenuItem icon={<FontAwesomeIcon icon={['far', 'gem']} />}>Dashboard</MenuItem>
            <SubMenu title="Components" icon={<faHeart />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar> */}
        {/* <div>
          <h1>content</h1>
        </div>
      </div> */}

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </>
  )
}
