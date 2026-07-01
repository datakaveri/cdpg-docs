import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from '../homepage.module.css';

type IconName =
  | 'exchange'
  | 'shield'
  | 'plug'
  | 'people'
  | 'flask'
  | 'spark'
  | 'card'
  | 'lock';

function Glyph({name}: {name: IconName}): ReactNode {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'exchange':
      return (
        <svg {...common}><path d="M4 8h12l-3-3M20 16H8l3 3" /></svg>
      );
    case 'shield':
      return (
        <svg {...common}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
      );
    case 'plug':
      return (
        <svg {...common}><path d="M12 3v6M8 9h8v3a4 4 0 01-8 0V9zM12 16v5" /></svg>
      );
    case 'people':
      return (
        <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0112 0" /><path d="M16 6a3 3 0 010 6M17 14a6 6 0 014 6" /></svg>
      );
    case 'flask':
      return (
        <svg {...common}><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" /><path d="M7.5 15h9" /></svg>
      );
    case 'spark':
      return (
        <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /></svg>
      );
    case 'card':
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
      );
    case 'lock':
      return (
        <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
      );
  }
}

type Feature = {
  icon: IconName;
  tag: string;
  title: string;
  text: string;
};

const features: Feature[] = [
  {
    icon: 'exchange',
    tag: 'APIs',
    title: 'Open, standards-based APIs',
    text: 'Resource-access APIs harmonized with ETSI NGSI-LD, plus support for OGC, GTFS, FHIR, and RESTful APIs for interoperability across legacy and modern systems.',
  },
  {
    icon: 'flask',
    tag: 'Discovery',
    title: 'Catalogue & discovery',
    text: 'A Catalogue Server indexes datasets, APIs, and metadata as JSON-LD, with geo-spatial, attribute, and text search so consumers can find relevant resources.',
  },
  {
    icon: 'shield',
    tag: 'Trust',
    title: 'Consent & access control',
    text: 'Dynamic, user-defined access policies, consent-driven sharing, a runtime policy engine and authorization services, and audit logs for full traceability.',
  },
  {
    icon: 'plug',
    tag: 'Ingestion',
    title: 'Data ingestion',
    text: 'Pluggable adaptors for APIs, files, IoT, and message queues, with secure onboarding and validation pipelines for diverse data sources.',
  },
  {
    icon: 'spark',
    tag: 'Architecture',
    title: 'Federated & cloud-native',
    text: 'A modular microservices architecture with independent and third-party resource servers coexisting in one exchange — for centralised or federated deployments.',
  },
  {
    icon: 'lock',
    tag: 'Security',
    title: 'Security & observability',
    text: 'TLS everywhere, certificate-based authentication, API gateways for traffic control and rate limiting, immutable audit logs, and full-stack monitoring.',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Key features</span>
          <h2 className={styles.sectionTitle}>What a secure, open data exchange needs</h2>
          <p className={styles.sectionLede}>
            Standards-based APIs, discovery, consent, and governance —
            delivered as modular, cloud-native microservices.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid4}`}>
          {features.map((f) => (
            <div className={styles.card} key={f.title}>
              <div className={styles.cardIcon} aria-hidden="true">
                <Glyph name={f.icon} />
              </div>
              <span className={styles.cardTag}>{f.tag}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.cta} style={{marginTop: '2.5rem'}}>
          <Link className="button button--primary button--lg" to="/docs/platform/key-features">
            See all features
          </Link>
        </div>
      </div>
    </section>
  );
}
