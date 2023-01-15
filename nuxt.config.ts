import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
    }
  ], 
  ],
  runtimeConfig: {
    // metioURlApi: process.env.BASE_METIO_API
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   }
  // }
  ssr: false,
  devServer: {
    port: 3001
  }
});
