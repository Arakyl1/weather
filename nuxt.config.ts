import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 
    ['@kevinmarrec/nuxt-pwa', {
      icon: {
        source: 'assets/manifest/cloudy-1.png'
      },
      meta: {
        theme_color: '#685e6f'
      }
    }],
  ],
  runtimeConfig: {
    // metioURlApi: process.env.BASE_METIO_API
  },
  ssr: false,
});
