<template>
  <InteractiveBackground />

  <div class="app-container relative z-10">
    <el-container>
      <el-header height="auto" style="padding: 0;">
        <el-menu
          mode="horizontal"
          :default-active="route.path"
          router
          class="cyber-menu"
        >
          <el-menu-item index="/">及時股票查詢</el-menu-item>
          <el-menu-item index="/strategy">策略紀錄</el-menu-item>
          <el-menu-item index="/dividend">股息紀錄</el-menu-item>
          <el-menu-item index="/chatBot">AI助理聊天</el-menu-item>
          <el-menu-item index="/cache">快取管理</el-menu-item>
          <el-menu-item index="/chart">歷史圖表</el-menu-item>
          <el-menu-item index="/query-pie">圓餅統計</el-menu-item>
          <el-menu-item index="/fugle-kdj">參數指標</el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import InteractiveBackground from './components/InteractiveBackground.vue' // 確保路徑正確

const route = useRoute()
</script>

<style>
/* ====================================================
   全站背景：深藍色街機網格 (Dark Pixel Grid)
==================================================== */
html, body {
  background-color: #0B101E !important; /* 留著底色防閃爍 */
  /* 刪除原本的 background-image 網格，把空間還給 p5.js 動畫 */
  color: #E0E0E0 !important;
  min-height: 100vh;
  margin: 0;
}

#app {
  background-color: transparent !important; /* 確保根節點完全透明 */
}

/* ====================================================
   強制挖空 Element Plus 的所有排版容器
==================================================== */
.app-container,
.el-container,
.el-header,
.el-main,
.el-footer {
  background: transparent !important;
  background-color: transparent !important;
}

/* 徹底清除 Element Plus 全域亮色變數 */
:root {
  --el-bg-color-page: transparent !important;
  --el-bg-color: transparent !important;
  --el-text-color-primary: #E0E0E0 !important;
}

/* ====================================================
   導覽列黑金科技感樣式 (cyber-menu)
==================================================== */
.cyber-menu {
  background-color: rgba(10, 12, 15, 0.9) !important; /* 深黑底色 */
  backdrop-filter: blur(8px);
  border-bottom: 2px solid rgba(255, 215, 0, 0.4) !important; /* 金色底線 */
  display: flex;
  justify-content: center;
}

.cyber-menu .el-menu-item {
  color: #E0E0E0 !important;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

/* 游標滑過與當前頁面的發光效果 */
.cyber-menu .el-menu-item:hover,
.cyber-menu .el-menu-item.is-active {
  background-color: rgba(255, 215, 0, 0.1) !important;
  color: #FFD700 !important; /* 金色文字 */
  border-bottom: 2px solid #FFD700 !important;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}
</style>