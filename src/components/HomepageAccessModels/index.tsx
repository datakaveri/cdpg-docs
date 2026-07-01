import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from '../homepage.module.css';

const models = [
  {
    cls: styles.m1,
    name: 'Bulk Download',
    text: 'A copy of a dataset is downloaded to authorized users — ideal for static, historical, and large-scale offline analysis.',
  },
  {
    cls: styles.m2,
    name: 'Pull-based API',
    text: 'Regulated, policy-based, on-demand access on a per-record basis through secure, standardized NGSI-LD APIs.',
  },
  {
    cls: styles.m3,
    name: 'Push-based Stream',
    text: 'Real-time updates streamed to subscribed consumers via the data broker — for IoT, time-series, and live events.',
  },
];

export default function HomepageAccessModels(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.kicker}>Data Access Models</span>
          <h2 className={styles.sectionTitle}>Three ways to access data, one trust fabric</h2>
          <p className={styles.sectionLede}>
            IUDX supports bulk downloads, pull-based APIs, and push-based
            streams — all governed by consent and policy.
          </p>
        </div>
        <div className={styles.modelRow}>
          {models.map((m) => (
            <div className={styles.model} key={m.name}>
              <div className={`${styles.modelHead} ${m.cls}`}>{m.name}</div>
              <div className={styles.modelBody}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.cta} style={{marginTop: '2.5rem'}}>
          <Link className="button button--outline button--lg" to="/docs/platform/data-access-models">
            Learn how access models work
          </Link>
        </div>
      </div>
    </section>
  );
}
