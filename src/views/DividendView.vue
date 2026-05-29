<template>
  <div class="dividend-dashboard">
    
    <header class="cyber-header">
      <h1 class="neon-title">股息追蹤庫</h1>
    </header>

    <div class="iframe-container neon-border">
      <iframe
        src="https://dragonleolin.github.io/dividend-record/"
        class="cyber-iframe"
        title="Dividend Record"
        allowfullscreen
      ></iframe>
    </div>

  </div>
</template>

<style scoped>
/* =========================================
   主體佈局與標題 (與策略頁面保持一致)
========================================= */
.dividend-dashboard {
  padding: 20px;
  max-width: 1600px; 
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
  height: 75vh; /* 佔滿畫面高度 75% */
  background: rgba(10, 12, 15, 0.5); 
  backdrop-filter: blur(4px);
  padding: 4px;
  position: relative;
}

.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 
    0 0 15px rgba(0, 240, 255, 0.1), 
    inset 0 0 15px rgba(0, 240, 255, 0.1);
  
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