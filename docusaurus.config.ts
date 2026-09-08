import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FMD Framework',
  tagline: 'A Microsoft Fabric Framework for Metadata-Driven Data Pipelines',
  favicon: 'img/brand/fmd-logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://fmd-framework-epjf.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'edkreuk', // Usually your GitHub org/user name.
  projectName: 'FMD_FRAMEWORK', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          editUrl: 'https://github.com/edkreuk/FMD_FRAMEWORK/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/edkreuk/FMD_FRAMEWORK/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/brand/fmd-cover-portal.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'FMD Framework',
      logo: {
        alt: 'FMD Framework Logo',
        src: 'img/brand/fmd-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://erwindekreuk.com/fmd-framework/',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/edkreuk/FMD_FRAMEWORK',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Deployment Guide',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK/blob/main/FMD_FRAMEWORK_DEPLOYMENT.md',
            },
            {
              label: 'Business Domain Guide',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK/blob/main/FMD_BUSINESS_DOMAIN_DEPLOYMENT.md',
            },
          ],
        },
        {
          title: 'Community',
          items: [
           
            {
              label: 'Issues',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK/issues',
            },
                        {
              label: 'Discussions',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK/discussions',
            },
            {
              label: 'LinkedIn - Erwin de Kreuk',
              href: 'https://www.linkedin.com/in/erwindekreuk/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
               href: 'https://erwindekreuk.com/fmd-framework/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK',
            },
            {
              label: 'License (MIT)',
              href: 'https://github.com/edkreuk/FMD_FRAMEWORK/blob/main/LICENSE',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FMD Framework — Erwin de Kreuk. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
