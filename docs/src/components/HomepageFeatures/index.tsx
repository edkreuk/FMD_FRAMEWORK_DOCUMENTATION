import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Dynamic Pipelines',
    icon: '⚡',
    description: (
      <>
        Automatically adjusts pipeline execution based on metadata — ideal for
        large-scale, multi-source Landing Zone, Bronze, and Silver ingestion.
      </>
    ),
  },
  {
    title: 'Scalable & Extensible',
    icon: '🧩',
    description: (
      <>
        A modular architecture that separates data, code, and orchestration,
        allowing custom logic and new transformations without breaking
        existing workloads.
      </>
    ),
  },
  {
    title: 'Governance & Observability',
    icon: '📊',
    description: (
      <>
        Track rows processed, load statuses, timestamps, and operational
        metrics through centralized metadata and logging in the Fabric SQL
        Database.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span className={styles.featureIcon} role="img" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
