import type {ReactNode} from 'react';
import styles from '../homepage.module.css';

const items = [
  'Open source — a freely available Digital Public Good with full ownership and no lock-in.',
  'A national standard — adopted by the Bureau of Indian Standards as IS 18003.',
  'Consent-driven and auditable — data is shared only with explicit provider consent, and every access is logged.',
  'Federated by design — independent and third-party resource servers coexist in one exchange.',
];

export default function HomepageDifferentiators(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Why IUDX</span>
          <h2 className={styles.sectionTitle}>Open, standards-based, sovereign data exchange</h2>
          <p className={styles.sectionLede}>
            IUDX interconnects data silos through open APIs and consent, so
            providers retain full control over their data.
          </p>
        </div>
        <div className={styles.diffGrid}>
          {items.map((text, i) => (
            <div className={styles.diffItem} key={i}>
              <span className={styles.diffMark}>&raquo;</span>
              <p className={styles.cardText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
