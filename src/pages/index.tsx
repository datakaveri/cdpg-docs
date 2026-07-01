import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageDifferentiators from '@site/src/components/HomepageDifferentiators';
import HomepageAccessModels from '@site/src/components/HomepageAccessModels';
import HomepageUseCases from '@site/src/components/HomepageUseCases';
import HomepageBenefits from '@site/src/components/HomepageBenefits';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>IUDX</span>
          <Heading as="h1" className={styles.heroTitle}>
            Intelligent Universal <span>Data Exchange</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            An open-source platform for the secure, authenticated, and
            consent-driven exchange of data between providers and consumers
            &mdash; an open standard (BIS&nbsp;IS&nbsp;18003) deployed across
            India&apos;s smart cities and beyond.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/overview">
              Explore the Platform
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/docs/develop/getting-started">
              For Developers
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div>
              <strong>55+</strong>
              <span>Smart cities sharing real-time IoT data</span>
            </div>
            <div>
              <strong>7,000</strong>
              <span>City buses streaming live in Bangalore</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Sectors: urban, agri, health, geospatial, transport</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="IUDX — an open-source platform for the secure, authenticated, and consent-driven exchange of data between providers and consumers, adopted as BIS standard IS 18003.">
      <HomepageHeader />
      <main>
        <HomepageDifferentiators />
        <HomepageFeatures />
        <HomepageAccessModels />
        <HomepageUseCases />
        <HomepageBenefits />
      </main>
    </Layout>
  );
}
