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
  projectName: 'cdpg-docs',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

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
          editUrl: 'https://github.com/datakaveri/cdpg-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        // Keep element ids in inlined SVGs — the interactive StepFlow
        // diagrams address paths/nodes by id, which SVGO would strip.
        svgr: {
          svgrConfig: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {overrides: {cleanupIds: false, removeViewBox: false}},
                },
              ],
            },
          },
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
    // Mermaid restyled to the CDPG palette so the remaining sequence/state
    // diagrams share the design language of the hand-crafted SVG diagrams.
    // (Values chosen to stay readable on the dark background too; dark-only
    // text tweaks live in custom.css.)
    mermaid: {
      theme: {light: 'base', dark: 'base'},
      options: {
        fontFamily: "Poppins, 'Segoe UI', system-ui, sans-serif",
        themeVariables: {
          fontSize: '14px',
          primaryColor: '#eef1f8',
          primaryTextColor: '#1f3569',
          primaryBorderColor: '#8794b8',
          secondaryColor: '#fdf0e3',
          tertiaryColor: '#f5f6f9',
          lineColor: '#8794b8',
          signalColor: '#8794b8',
          signalTextColor: '#5a6680',
          actorBkg: '#eef1f8',
          actorBorder: '#1f3569',
          actorTextColor: '#1f3569',
          labelBoxBkgColor: '#fdf0e3',
          labelBoxBorderColor: '#f57e20',
          labelTextColor: '#1f3569',
          loopTextColor: '#6a7488',
          noteBkgColor: '#fff4e8',
          noteBorderColor: '#f57e20',
          noteTextColor: '#1f3569',
          activationBkgColor: '#fdf0e3',
          activationBorderColor: '#f57e20',
          clusterBkg: '#f5f6f9',
          clusterBorder: '#d9deeb',
          edgeLabelBackground: '#ffffff',
        },
      },
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
        {to: '/docs/category/components', label: 'Components', position: 'left'},
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
