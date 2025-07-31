import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base:'./',
  plugins: [vue()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      '/stock': {
        target: 'http://172.20.10.2:8082',
        changeOrigin: true,
      },
      '/ws': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
