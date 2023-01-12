import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer"
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    viteSingleFile(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      compositionOnly: false,
      runtimeOnly: false,

      // you need to set i18n resource including paths !
      include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: false,
  },
})
