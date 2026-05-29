<template>
  <div class="statistics-dashboard">
    
    <header class="cyber-header">
      <h1 class="neon-title">查詢次數統計 (TOP 10)</h1>
    </header>

    <div class="hud-panel neon-border chart-container">
      <div v-if="!chartSrc" class="loading-text">
        > 正在從核心資料庫繪製圖表...
      </div>
      
      <el-image
        v-else
        :src="chartSrc"
        fit="contain"
        class="cyber-image"
        alt="查詢次數統計圖表"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const chartSrc = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('/stock/chart/query-count?t=' + Date.now(), {
      responseType: 'blob' // 指定為圖片 Blob 資料
    })

    const blob = new Blob([response.data], { type: 'image/png' })
    chartSrc.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('載入統計圖表失敗：', error)
  }
})
</script>

<style scoped>
/* =========================================
   主體佈局與標題
========================================= */
.statistics-dashboard {
  padding: 20px;
  max-width: 900px; /* 控制畫面寬度，讓圖片置中更好看 */
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.cyber-header {
  margin-bottom: 30px;
}
.neon-title {
  font-size: 24px;
  color: #00F0FF;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
  margin: 0;
  font-weight: bold;
  letter-spacing: 2px;
}
.subtitle {
  font-size: 12px;
  color: #008b99;
  margin-top: 5px;
  letter-spacing: 1px;
}
.status-online {
  color: #39FF14;
  animation: pulse 2s infinite;
}

/* =========================================
   圖表外框面板 (HUD Panel)
========================================= */
.hud-panel {
  background: rgba(10, 12, 15, 0.85);
  backdrop-filter: blur(8px);
  padding: 24px;
  border-radius: 4px;
}

.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1), inset 0 0 15px rgba(0, 240, 255, 0.1);
  clip-path: polygon(
    0 0, 
    calc(100% - 20px) 0, 
    100% 20px, 
    100% 100%, 
    20px 100%, 
    0 calc(100% - 20px)
  );
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px; /* 給一個基礎高度，避免載入時畫面跳動 */
}

/* =========================================
   圖表與載入文字樣式
========================================= */
.cyber-image {
  width: 100%;
  max-width: 700px;
  /* 給圖片加一點科技感的發光外框 */
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.5); 
}

.loading-text {
  color: #00F0FF;
  font-family: monospace;
  font-size: 16px;
  letter-spacing: 2px;
  animation: pulse 1.5s infinite;
}

/* 動畫 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>