import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Documentation structure modelled on the MOSIP 1.2.0 docs:
 *   Get Started → Architecture & Technology → Core Servers →
 *   Data Exchange → Develop → Adoption → Resources.
 * Each top-level area has a generated landing page.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Get Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Get Started with IUDX',
        description:
          'Understand what IUDX is, the principles behind it, its capabilities, and how it is licensed.',
        slug: '/category/get-started',
      },
      items: [
        'platform/key-features',
        'technical/design-principles',
        'platform/licensing',
      ],
    },
    {
      type: 'category',
      label: 'Architecture & Technology',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Architecture & Technology',
        description:
          'The architecture of IUDX — its interfaces, control and data planes, technology stack, and the open standards it is built on.',
        slug: '/category/technology',
      },
      items: [
        'technical/overview',
        'technical/architecture',
        'technical/control-plane',
        'technical/data-plane',
        'technical/technology-stack',
        'platform/standards',
      ],
    },
    {
      type: 'category',
      label: 'Core Servers',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Core Servers',
        description:
          'The three microservices that make up IUDX — the Catalogue Server, the Authorization Server, and the Resource Server(s).',
        slug: '/category/servers',
      },
      items: [
        'technical/catalogue-server',
        'technical/authorization-server',
        'technical/resource-server',
      ],
    },
    {
      type: 'category',
      label: 'Data Exchange',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Data Exchange',
        description:
          'How data moves through IUDX — onboarding and ingestion, discovery, and the ways consumers access data.',
        slug: '/category/data-exchange',
      },
      items: ['develop/data-ingestion', 'platform/data-access-models'],
    },
    {
      type: 'category',
      label: 'Develop',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Developer Guides',
        description:
          'Build against IUDX — getting started, the API surface, and the standards behind them.',
        slug: '/category/develop',
      },
      items: ['develop/getting-started', 'develop/apis', 'develop/endpoints'],
    },
    {
      type: 'category',
      label: 'Adoption',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Adoption',
        description:
          'Proven deployments, detailed case studies, and how IUDX compares to other data-exchange platforms.',
        slug: '/category/adoption',
      },
      items: [
        'adoption/use-cases',
        'adoption/case-studies',
        'adoption/market-comparison',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Resources',
        description: 'Deployment guidance and a glossary of key terms.',
        slug: '/category/resources',
      },
      items: ['technical/deployment', 'technical/definitions'],
    },
  ],
};

export default sidebars;
