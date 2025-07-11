import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base:'./',
  plugins: [vue()],
  server: {
    proxy: {
      '/stock': {
        target: 'http://172.20.10.2:8082',
        changeOrigin: true,
      },
    },
  },
})
