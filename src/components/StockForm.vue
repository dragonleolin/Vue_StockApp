<template>
  <el-form @submit.prevent="fetchStocks" style="display: flex; gap: 10px; align-items: center;">
    <el-input v-model="codes" placeholder="輸入股票代號例如: 2330,0050" style="width: 300px" />
    <el-button @click="fetchStocks" type="primary">查詢</el-button>
    
    <el-button @click="loadDefaultCodes">載入預設股號</el-button>
  </el-form>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

// 宣告 emit 讓第 23 行可以正常運作
const emit = defineEmits(['update'])

const codes = ref('')

// 新增一個常數儲存你的預設清單
const DEFAULT_STOCK_CODES = '2330,0052,006208,00878,00919,00830,00763U,0050,3515,2347'

// 新增的函式：點擊按鈕時，將輸入框的值替換成預設清單
const loadDefaultCodes = () => {
  codes.value = DEFAULT_STOCK_CODES
}

const fetchStocks = async () => {
  // 如果輸入框是空的，可以加個保護機制避免送出空請求
  if (!codes.value) return 
  
  const res = await axios.post('/stock', { codes: codes.value.split(',') })
  emit('update', res.data)
}
</script>