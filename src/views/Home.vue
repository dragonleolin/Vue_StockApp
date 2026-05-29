<template>
  <div class="tech-dashboard">
    <header class="cyber-header">
    
      <div class="status-indicator">
        STATUS: <span class="status-online">ONLINE</span>
      </div>
    </header>

    <section class="hud-panel neon-border mb-6 group">
      <div class="panel-title">輸入查詢股號</div>
      <div class="panel-content">
        <StockForm @update="data = $event" />
      </div>
    </section>

    <section class="hud-panel neon-border group">
      <div class="panel-title">查詢結果</div>
      <div class="panel-content">
        <ResultList :data="data" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StockForm from '../components/StockForm.vue'
import ResultList from '../components/ResultList.vue'

// 用來接 StockForm 傳來的資料，再餵給 ResultList
const data = ref([])
</script>

<style scoped>
/* =========================================
   1. 基礎排版與標頭
========================================= */
.tech-dashboard {
  background: transparent;
  color: #00F0FF; 
  padding: 20px;
  max-width: 900px; /* 🌟 加上這行：限制最大寬度，讓卡片變小 */
  margin: 0 auto;   /* 🌟 加上這行：讓卡片乖乖置中 */
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid rgba(0, 240, 255, 0.4);
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.neon-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #00F0FF;
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.8), 0 0 10px rgba(0, 240, 255, 0.4);
}

.subtitle {
  font-size: 12px;
  color: #008b99;
  margin-top: 5px;
  letter-spacing: 1px;
}

.status-online {
  color: #39FF14;
  text-shadow: 0 0 5px #39FF14;
  animation: pulse 2s infinite;
}

/* =========================================
   2. 靈魂特效：黑金玻璃透視面板
========================================= */
.hud-panel {
  background: rgba(10, 12, 15, 0.85);
  backdrop-filter: blur(8px);
  padding: 16px; /* 🌟 從原本的 24px 改成 16px，讓框框看起來更緊湊俐落 */
  position: relative;
  transition: all 0.3s ease;
}

.panel-title {
  font-size: 14px;
  color: #FFD700; 
  border-bottom: 1px dashed rgba(255, 215, 0, 0.4);
  padding-bottom: 8px;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.neon-border {
  border: 1px solid rgba(255, 215, 0, 0.4);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.05), inset 0 0 10px rgba(255, 215, 0, 0.05);
  clip-path: polygon(
    0 0, 
    calc(100% - 20px) 0, 
    100% 20px, 
    100% 100%, 
    20px 100%, 
    0 calc(100% - 20px)
  );
}

.neon-border:hover {
  border-color: rgba(255, 215, 0, 0.9);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2), inset 0 0 15px rgba(255, 215, 0, 0.1);
}

.mb-6 { margin-bottom: 24px; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* =========================================
   3. 強制穿透覆蓋 Element Plus 元件 (Deep Selectors)
========================================= */

/* --- 覆蓋輸入框 (Input) --- */
:deep(.el-input__wrapper) {
  background-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.5) inset !important;
}
:deep(.el-input__inner) {
  color: #FFD700 !important;
}
:deep(.el-input__inner::placeholder) {
  color: rgba(255, 215, 0, 0.3) !important;
}

/* --- 覆蓋按鈕 (Button) --- */
:deep(.el-button) {
  background-color: rgba(20, 20, 20, 0.9) !important;
  color: #FFD700 !important;
  border: 1px solid rgba(255, 215, 0, 0.5) !important;
  font-family: inherit;
  letter-spacing: 1px;
}
:deep(.el-button:hover) {
  background-color: rgba(255, 215, 0, 0.2) !important;
  border-color: #FFD700 !important;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

/* --- 覆蓋表格 (Table) --- */
/* 利用 Element Plus 的 CSS 變數直接置換顏色 */
:deep(.el-table) {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-header-bg-color: rgba(20, 20, 20, 0.8) !important;
  --el-table-header-text-color: #FFD700 !important;
  --el-table-text-color: #E0E0E0 !important;
  --el-table-row-hover-bg-color: rgba(255, 215, 0, 0.1) !important;
  --el-table-border-color: rgba(255, 215, 0, 0.2) !important;
  background-color: transparent !important;
}

/* 隱藏表格底部那條死白的線 */
:deep(.el-table__inner-wrapper::before) {
  display: none !important;
}

/* 強制透明背景與底線 */
:deep(.el-table th.el-table__cell),
:deep(.el-table td.el-table__cell) {
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2) !important;
}

/* --- 覆蓋分頁器 (Pagination) --- */
:deep(.el-pagination button:disabled),
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pager li) {
  background-color: transparent !important;
  color: #888 !important;
}
:deep(.el-pager li.is-active) {
  color: #FFD700 !important;
  font-weight: bold;
}
</style>