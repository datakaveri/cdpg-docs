import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'IUDX',
  tagline: 'Intelligent Universal Data Exchange',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://datakaveri.github.io',
  baseUrl: '/cdpg-docs/',

  organizationName: 'datakaveri',
  projectName: 'iudx-novo-docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/datakaveri/iudx-novo-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/iudx-novo-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'IUDX — Intelligent Universal Data Exchange',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/docs/category/technology', label: 'Architecture', position: 'left'},
        {to: '/docs/category/servers', label: 'Core Servers', position: 'left'},
        {to: '/docs/develop/getting-started', label: 'For Developers', position: 'left'},
        {
          href: 'https://dataforpublicgood.org.in',
          label: 'CDPG',
          position: 'right',
        },
        {
          href: 'https://github.com/datakaveri',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Overview', to: '/docs/overview'},
            {label: 'Architecture', to: '/docs/technical/architecture'},
            {label: 'Getting Started', to: '/docs/develop/getting-started'},
          ],
        },
        {
          title: 'Platform',
          items: [
            {label: 'Key Features', to: '/docs/platform/key-features'},
            {label: 'Data Access Models', to: '/docs/platform/data-access-models'},
            {label: 'Licensing', to: '/docs/platform/licensing'},
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {label: 'IUDX', href: 'https://iudx.org.in'},
            {label: 'CDPG', href: 'https://dataforpublicgood.org.in'},
            {label: 'GitHub', href: 'https://github.com/datakaveri'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Centre for Data for Public Good (CDPG), IISc. Built with Docusaurus. <br/>For more details visit dataforpublicgood.org.in or email info@cdpg.org.in`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
