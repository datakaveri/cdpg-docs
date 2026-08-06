import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Documentation structure modelled on the MOSIP 1.2.0 docs (carried over from
 * the original IUDX site):
 *   Get Started → Architecture & Technology → Platform Components →
 *   Platform Flows → Data Exchange → Develop → API Reference → Guides →
 *   Operations → Migration → Adoption → Resources.
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
        title: 'Get Started',
        description:
          'Understand what the Data Exchange is, the principles behind it, its core concepts and capabilities, and how it is licensed.',
        slug: '/category/get-started',
      },
      items: [
        'platform/key-features',
        'concepts/core-concepts',
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
          'The architecture of the Data Exchange — its interfaces, control and data planes, the optional agentic plane, microservices, technology stack, deployment shapes, and the open standards it is built on.',
        slug: '/category/technology',
      },
      items: [
        'technical/overview',
        'technical/architecture',
        'technical/control-plane',
        'technical/data-plane',
        'technical/agentic-plane',
        'technical/technology-stack',
        'platform/standards',
        'technical/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Platform Components',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Platform Components',
        description:
          'Every service that makes up the Data Exchange — what it does, how it enforces access, and what it talks to.',
        slug: '/category/components',
      },
      items: [
        'components/api-gateway',
        'components/identity-provider',
        'components/authorization-service',
        'components/policy-service',
        'components/user-service',
        'components/catalogue',
        'components/data-plane',
        'components/file-exchange',
        'components/community-layer',
        'components/marketplace',
        'components/agent-plane',
        'components/supporting-services',
        'components/messaging-backbone',
      ],
    },
    {
      type: 'category',
      label: 'Platform Flows',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Platform Flows',
        description:
          'End-to-end walkthroughs of the key journeys — authentication, consuming data, the lifecycle of an access policy, and how an AI agent borrows authority.',
        slug: '/category/flows',
      },
      items: [
        'flows/authentication',
        'flows/data-consumption',
        'flows/policy-lifecycle',
        'flows/agent-delegation',
      ],
    },
    {
      type: 'category',
      label: 'Data Exchange',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Data Exchange',
        description:
          'How data moves through the platform — onboarding and ingestion, discovery, and the ways consumers access data.',
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
          'Build against the Data Exchange — getting started, running the platform locally, configuration, API standards, and the shared libraries.',
        slug: '/category/develop',
      },
      items: [
        'develop/getting-started',
        'develop/local-development',
        'develop/configuration',
        'develop/api-standards',
        'develop/endpoints',
        'develop/sdks-libraries',
        'develop/testing',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'API Reference',
        description:
          'Authentication, endpoint documentation, and the platform-wide error contract.',
        slug: '/category/api-reference',
      },
      items: [
        'api-reference/auth-flow',
        'api-reference/acl-endpoints',
        'api-reference/error-responses',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Guides',
        description:
          'Task-oriented guides for debugging and understanding the platform in depth.',
        slug: '/category/guides',
      },
      items: [
        'guides/jwt-validation',
        'guides/fga-authorization',
        'guides/debugging-policy-creation',
        'guides/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Operations',
        description:
          'Running the Data Exchange in production — GitOps deployment, monitoring and health, and security practices.',
        slug: '/category/operations',
      },
      items: [
        'operations/deployment-gitops',
        'operations/monitoring',
        'operations/security',
      ],
    },
    {
      type: 'category',
      label: 'Migration',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Migration',
        description:
          'Moving from the legacy platform to the current Data Exchange — what changed, what is preserved, and how to migrate a client.',
        slug: '/category/migration',
      },
      items: ['migration/overview', 'migration/client-guide'],
    },
    {
      type: 'category',
      label: 'Adoption',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Adoption',
        description:
          'Proven deployments, detailed case studies, and how the platform compares to other data exchanges.',
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
        description: 'FAQs, glossary, release notes, and how to contribute.',
        slug: '/category/resources',
      },
      items: [
        'resources/faq',
        'resources/glossary',
        'resources/release-notes',
        'resources/contributing',
      ],
    },
  ],
};

export default sidebars;
