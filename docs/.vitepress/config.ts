import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'SolidUse',
  titleTemplate: 'A utils function library for SolidJS.',
  description:
    'A utils function library for SolidJS (Inspired by ahooks and VueUse).',
  appearance: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'SolidUse',
    nav: [
      {
        text: 'Guide',
        items: [{ text: 'Get Started', link: '/guide/get-started' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wjq990112/soliduse' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT SolidUse',
    },
    editLink: {
      repo: 'https://github.com/wjq990112/soliduse',
    },
  },
});
