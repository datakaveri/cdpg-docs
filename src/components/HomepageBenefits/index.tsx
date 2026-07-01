import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from '../homepage.module.css';

const benefits = [
  {
    title: 'Sovereign & vendor-neutral',
    text: 'Deployable and fully owned by governments and organizations, with no licensing cost and no dependence on a single provider.',
  },
  {
    title: 'Open & standards-compliant',
    text: 'Open source and built on open standards (NGSI-LD, OGC), adopted by the Bureau of Indian Standards as IS 18003.',
  },
  {
    title: 'Federated & scalable',
    text: 'A cloud-native, microservices design that scales from a single department to national level, centralised or federated.',
  },
  {
    title: 'Consent & compliance',
    text: 'Consent-driven sharing, runtime policy enforcement, and auditable governance across every access.',
  },
];

export default function HomepageBenefits(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Core Benefits</span>
          <h2 className={styles.sectionTitle}>Secure, scalable data exchange and beyond</h2>
        </div>
        <div className={styles.benefitGrid}>
          {benefits.map((b, i) => (
            <div className={styles.benefit} key={b.title}>
              <span className={styles.benefitNum}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitText}>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cta} style={{marginTop: '3rem'}}>
          <Link className="button button--primary button--lg" to="/docs/overview">
            Read the documentation
          </Link>
        </div>
      </div>
    </section>
  );
}
