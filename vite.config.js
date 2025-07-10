import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
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
