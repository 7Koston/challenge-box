import type { NitroRouteConfig } from 'nitropack';
import pkg from './package.json';

const assetsMaxAge = 31536000;
//
const noSsrNoIndexNoStorePR: NitroRouteConfig = {
  ssr: true,
  swr: false,
  prerender: true,
  static: false,
  cache: undefined,
  headers: {
    'Cache-Control': 'no-store,max-age=1',
  },
};
//
const assetsR: NitroRouteConfig = {
  ssr: false,
  swr: false,
  prerender: false,
  static: true,
  cache: { maxAge: assetsMaxAge },
  headers: { 'Cache-Control': `public,max-age=${assetsMaxAge}` },
};
const workersR: NitroRouteConfig = {
  ssr: false,
  swr: false,
  prerender: false,
  cache: false,
  headers: { 'Service-Worker-Allowed': '/' },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: false },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  routeRules: {
    '/': noSsrNoIndexNoStorePR,
    //
    '/fonts/**': assetsR,
    '/icons/**': assetsR,
    '/favicon.ico': assetsR,
    '/robots.txt': assetsR,
    //
    '/workers/**': workersR,
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ru',
        language: 'ru-RU',
        name: 'Russian',
        file: 'ru.json',
      },
    ],
  },
  icon: {
    provider: 'none',
    customCollections: [
      {
        prefix: '',
        dir: './app/assets/icons',
      },
    ],
  },
  // Generated with: https://material-foundation.github.io
  css: [
    '~/assets/css/theme/dark.css',
    '~/assets/css/theme/light.css',
    '~/assets/css/global.css',
  ],
  nitro: {
    preset: 'github_pages',
    compressPublicAssets: { gzip: true, brotli: true },
  },
  eslint: {
    config: {
      standalone: true,
      tooling: {
        unicorn: true,
      },
    },
  },
  // runtimeConfig variables can be loaded at run time, to see how:
  // https://nuxt.com/docs/4.x/guide/going-further/runtime-config
  runtimeConfig: {
    buildVersion: pkg.version,
    // PUBLIC IS EXPOSED TO CLIENT SIDE
    public: {
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
});
