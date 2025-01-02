import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../../',
  srcDir: 'src',
  devtools: { enabled: true },

  devServer: {
    host: 'localhost',
    port: 4200,
  },

  typescript: {
    typeCheck: true,
  },

  imports: {
    autoImport: true,
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [nxViteTsPaths()],
  },

  compatibilityDate: '2024-12-29',
  modules: ['@nuxt/ui'],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
})
