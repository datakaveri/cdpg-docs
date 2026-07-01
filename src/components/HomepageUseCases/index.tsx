import type {ReactNode} from 'react';
import styles from '../homepage.module.css';

const cases = [
  {
    sector: 'Urban · IoT',
    title: 'Real-time smart city data sharing',
    text: 'Live IoT data sharing across 55 Indian cities through the IUDX platform (iudx.org.in).',
  },
  {
    sector: 'Geospatial',
    title: "India's National Geospatial Policy",
    text: 'A geospatial data platform supporting the National Geospatial Policy (geospatial.org.in).',
  },
  {
    sector: 'Agriculture',
    title: 'Improved farmer loans with ADeX',
    text: 'Agri-data and the Agriculture Data Exchange (ADeX) improving farmer loans in Telangana (adex.org.in).',
  },
  {
    sector: 'Healthcare',
    title: 'ICMR health data platform',
    text: 'A healthcare data platform for standardization, analysis, and sharing for the Indian Council of Medical Research.',
  },
  {
    sector: 'Transportation',
    title: 'Bangalore transportation stack',
    text: 'Real-time data streaming from 7,000 city buses across Bangalore.',
  },
];

export default function HomepageUseCases(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Proven Deployments</span>
          <h2 className={styles.sectionTitle}>From departmental to national scale</h2>
          <p className={styles.sectionLede}>
            Notable deployments span transportation, agriculture, healthcare,
            urban, and geospatial sectors.
          </p>
        </div>
        <div className={styles.useGrid}>
          {cases.map((c) => (
            <div className={styles.useCard} key={c.title}>
              <span className={styles.useSector}>{c.sector}</span>
              <h3 className={styles.useTitle}>{c.title}</h3>
              <p className={styles.useText}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
