<template>
    <div>
      <el-input v-model="code" placeholder="股票代號" style="width: 150px" />
      <el-date-picker v-model="from" type="date" placeholder="起始日期" style="margin-left: 10px" />
      <el-date-picker v-model="to" type="date" placeholder="結束日期" style="margin-left: 10px" />
      <el-button type="primary" @click="showChart" style="margin-left: 10px">產生圖表</el-button>
  
      <div v-if="chartUrl" style="margin-top: 20px;">
        <a :href="chartUrl" download="chart.png" target="_blank" style="display: inline-block;">
          <el-image
            :src="chartUrl"
            style="width: 700px;"
            fit="contain"
            alt="點擊圖片下載"
          />
        </a>
        <div style="font-size: 12px; margin-top: 4px; color: #888;">（點擊圖片即可下載）</div>
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
  