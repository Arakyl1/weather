import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 
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
