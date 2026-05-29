<template>
  <div class="result-list-container">
    
    <el-table :data="pagedData" style="width: 100%" empty-text="AWAITING DATA...">
      <el-table-column prop="code" label="股票代號" width="120" />
      <el-table-column prop="name" label="名稱" width="150" />
      <el-table-column prop="price" label="價格" width="120" />
      
      <el-table-column label="K 值" width="100" align="center">
        <template #default="scope">
          <span :class="getKdClass(scope.row.k)">{{ scope.row.k ?? '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="D 值" width="100" align="center">
        <template #default="scope">
          <span :class="getKdClass(scope.row.d)">{{ scope.row.d ?? '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="marketTime" label="時間" min-width="180" />
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="page"
        :page-size="20"
        :total="data.length"
        layout="prev, pager, next"
        class="cyber-pagination"
      />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const page = ref(1)

// 處理分頁資料切割
const pagedData = computed(() => {
  const start = (page.value - 1) * 20
  const end = page.value * 20
  return props.data.slice(start, end)
})

// KD 值視覺化判斷引擎
const getKdClass = (value) => {
  if (value === undefined || value === null) return 'kd-normal'
  
  const num = parseFloat(value)
  if (num <= 25) return 'kd-low'    // 低檔超賣 (螢光綠)
  if (num >= 75) return 'kd-high'   // 高檔超買 (螢光粉紅)
  
  return 'kd-normal'                // 正常區間 (冰藍色)
}
</script>

<style scoped>
/* =========================================
   KD 值專屬視覺化特效
========================================= */
.kd-low {
  color: #39FF14 !important; 
  font-weight: bold;
  text-shadow: 0 0 8px rgba(57, 255, 20, 0.6);
}

.kd-high {
  color: #FF00FF !important; 
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.6);
}

.kd-normal {
  color: #9EE9F8; 
}

/* =========================================
   分頁區塊與樣式覆蓋 (黑金科技風)
========================================= */
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

/* 覆蓋 Element Plus 預設的白底分頁樣式 */
:deep(.el-pagination) {
  --el-pagination-bg-color: transparent !important;
  --el-pagination-text-color: #9EE9F8 !important;
  --el-pagination-button-color: #00F0FF !important;
  --el-pagination-button-disabled-color: rgba(0, 240, 255, 0.2) !important;
  --el-pagination-hover-color: #FFD700 !important;
}

/* 數字頁碼區塊 */
:deep(.el-pager li) {
  background: transparent !important;
  color: #008b99 !important;
  transition: all 0.3s ease;
}

/* 當前選中的頁面 (顯示為發光金色) */
:deep(.el-pager li.is-active) {
  color: #FFD700 !important;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}
</style>