import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base:'./',
  plugins: [vue()],
  server: {
    proxy: {
      '/stock': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
    },
  },
})
