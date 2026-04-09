import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // 重要：部署到 GitHub Pages 時，如果你的網址是 https://github.com/dragonleolin/
    base: '/Vue_StockApp/',
})
