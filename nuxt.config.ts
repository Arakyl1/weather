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
    public: {
      URL_API_METIO: 'https://api.open-meteo.com'
    }
  },
  ssr: false,
});
