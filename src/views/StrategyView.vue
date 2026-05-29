<template>
  <div class="strategy-dashboard">
    
    <header class="cyber-header">
      <h1 class="neon-title">戰略指揮所</h1>
    </header>

    <div class="iframe-container neon-border">
      <iframe
        src="https://dragonleolin.github.io/trade-command-center/"
        class="cyber-iframe"
        title="Trade Command Center"
        allowfullscreen
      ></iframe>
    </div>

  </div>
</template>

<script setup>
// 因為所有的邏輯都在你的 GitHub Pages 專案裡了
// 這裡不需要寫任何抓資料的 Vue JavaScript！非常乾淨！
</script>

<style scoped>
/* =========================================
   主體佈局與標題
========================================= */
.strategy-dashboard {
  padding: 20px;
  max-width: 1600px; /* 放寬以容納你的外部網站 */
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.cyber-header { 
  margin-bottom: 20px; 
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
   Iframe 容器與科技感外框
========================================= */
.iframe-container {
  width: 100%;
  height: 75vh; /* 讓畫面佔滿視窗高度的 75%，避免產生雙重卷軸 */
  background: rgba(10, 12, 15, 0.5); /* 微透明黑底 */
  backdrop-filter: blur(4px);
  padding: 4px;
  position: relative;
}

.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 
    0 0 15px rgba(0, 240, 255, 0.1), 
    inset 0 0 15px rgba(0, 240, 255, 0.1);
  
  /* 科技感折角設計 */
  clip-path: polygon(
    0 0, 
    calc(100% - 20px) 0, 
    100% 20px, 
    100% 100%, 
    20px 100%, 
    0 calc(100% - 20px)
  );
  transition: border-color 0.3s ease;
}

.neon-border:hover {
  border-color: rgba(0, 240, 255, 0.9);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

/* iframe 本身設定 */
.cyber-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  display: block;
}

@keyframes pulse { 
  0%, 100% { opacity: 1; } 
  50% { opacity: 0.4; } 
}
</style>