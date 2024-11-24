// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AR - VR',
  tagline: 'Realidade Ampliada - Realidade Virtual',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://Gabi-Barretto.github.io',

  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/OP03/',

  organizationName: "Gabi-Barretto", // Nome do seu GitHub
  projectName: "OP03", // Nome do repositório

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Documentação na raiz do site
          editUrl: 'https://github.com/Gabi-Barretto/OP03/edit/main/',
        },
        blog: false, // Blog desativado
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AR VR',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar', // ID da sidebar, definido no `sidebars.js`
          position: 'left',
          label: 'Documentação',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Gabi-Barretto. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;