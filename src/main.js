import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. 引入 Element Plus 核心與預設 CSS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 2. 引入我們的黑金客製化 CSS (順序必須在 Element Plus 之後！)
import './style.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus) // 把 Element Plus 註冊進去

app.mount('#app')