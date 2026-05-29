<template>
  <div class="chart-control-panel">
    <el-input v-model="code" placeholder="股票代號" style="width: 130px" />
    
    <el-date-picker 
      v-model="from" 
      type="date" 
      placeholder="起始日期" 
      style="margin-left: 10px; width: 160px;" 
      :teleported="false"
    />
    
    <el-date-picker 
      v-model="to" 
      type="date" 
      placeholder="結束日期" 
      style="margin-left: 10px; width: 160px;" 
      :teleported="false"
    />
    
    <el-button 
      @click="showChart" 
      style="margin-left: 10px; flex-shrink: 0; min-width: 120px; position: relative; z-index: 20;"
    >
      [ 產生圖表 ]
    </el-button>

    <div v-if="chartUrl" style="margin-top: 20px;">
      <a :href="chartUrl" download="chart.png" target="_blank" style="display: inline-block;">
        <el-image
          :src="chartUrl"
          style="width: 700px; border: 1px solid rgba(0, 240, 255, 0.3); padding: 4px;"
          fit="contain"
          alt="點擊圖片下載"
        />
      </a>
      <div class="download-hint">（點擊圖表即可下載影像檔）</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const code = ref('')
const from = ref('')
const to = ref('')
const chartUrl = ref('')

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

const showChart = () => {
  const formattedFrom = formatDate(from.value)
  const formattedTo = formatDate(to.value)

  if (code.value && formattedFrom && formattedTo) {
    chartUrl.value = `/stock/chart/${code.value}?from=${formattedFrom}&to=${formattedTo}&t=${Date.now()}`
  }
}
</script>

<style scoped>
/* =========================================
   1. 基礎控制面板樣式
========================================= */
.chart-control-panel {
  padding: 20px;
  background: rgba(10, 12, 15, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 4px;
  display: inline-block;
}

.download-hint {
  font-size: 12px; 
  margin-top: 8px; 
  color: #008b99; /* 科技青藍色，取代原本的 #888 灰色 */
  letter-spacing: 1px;
}

/* =========================================
   2. 輸入框與按鈕 (消滅白字)
========================================= */
/* 輸入框文字 */
:deep(.el-input__inner) {
  color: #9EE9F8 !important; /* 冰藍色取代白色 */
}
:deep(.el-input__inner::placeholder) {
  color: rgba(0, 240, 255, 0.4) !important;
}

/* =========================================
   按鈕終極黑金版 (防擠壓、防隱形)
========================================= */
:deep(.el-button) {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  
  /* 🌟 防擠壓三核心 */
  flex-shrink: 0 !important;
  min-width: 120px !important;
  height: 32px !important; /* 強制對齊 Element Plus 輸入框的高度 */
  
  /* 🌟 強制顯現 */
  opacity: 1 !important;
  visibility: visible !important;
  
  /* 顏色設定 */
  --el-button-bg-color: #141414 !important;
  --el-button-text-color: #FFD700 !important;
  --el-button-border-color: rgba(255, 215, 0, 0.6) !important;
  
  --el-button-hover-bg-color: rgba(255, 215, 0, 0.2) !important;
  --el-button-hover-text-color: #FFFFFF !important;
  --el-button-hover-border-color: #FFD700 !important;
  
  font-family: monospace;
  font-weight: bold !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

/* 強制確保按鈕內文字顏色 */
:deep(.el-button > span) {
  color: #FFD700 !important;
}
:deep(.el-button:hover > span) {
  color: #FFFFFF !important;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
}

/* =========================================
   3. 日期選擇器下拉選單 (黑金 x 科技青)
========================================= */
/* 下拉選單背景 */
:deep(.el-picker-panel) {
  background-color: rgba(10, 15, 25, 0.95) !important;
  border: 1px solid rgba(0, 240, 255, 0.4) !important;
  color: #9EE9F8 !important;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
}

/* 頂部月份/年份切換按鈕與文字 */
:deep(.el-date-picker__header-label),
:deep(.el-picker-panel__icon-btn) {
  color: #00F0FF !important;
}
:deep(.el-picker-panel__icon-btn:hover) {
  color: #FFD700 !important;
}

/* 星期幾的表頭 */
:deep(.el-date-table th) {
  color: rgba(0, 240, 255, 0.6) !important;
  border-bottom: 1px dashed rgba(0, 240, 255, 0.3);
}

/* 一般日期數字 */
:deep(.el-date-table td .el-date-table-cell__text) {
  color: #E2F1F8 !important;
}

/* 非本月日期的顏色 (調暗) */
:deep(.el-date-table td.prev-month .el-date-table-cell__text),
:deep(.el-date-table td.next-month .el-date-table-cell__text) {
  color: rgba(226, 241, 248, 0.2) !important;
}

/* 🌟 今天的日期 (青色外框) */
:deep(.el-date-table td.today .el-date-table-cell__text) {
  color: #00F0FF !important;
  font-weight: bold;
}

/* 🌟 滑鼠游標移過去的顏色 */
:deep(.el-date-table td:hover .el-date-table-cell__text) {
  color: #FFD700 !important;
}

/* 🌟 選中的日期 (金色底 + 黑字) */
:deep(.el-date-table td.current:not(.disabled) .el-date-table-cell__text) {
  background-color: #FFD700 !important;
  color: #000 !important;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

/* 隱藏彈出視窗的小箭頭 (避免白邊干擾) */
:deep(.el-popper__arrow) {
  display: none !important;
}
</style>