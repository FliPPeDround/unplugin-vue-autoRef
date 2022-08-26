import { URL, fileURLToPath } from 'node:url'
import AutoRef from 'unplugin-vue-autoref/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoRef(),
    vue({
      reactivityTransform: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
