<template>
    <div>
      <!-- 輸入區塊 -->
      <el-input v-model="code" placeholder="股票代號" style="width: 150px" />
      <el-date-picker v-model="from" type="date" placeholder="起始日期" style="margin-left: 10px" />
      <el-date-picker v-model="to" type="date" placeholder="結束日期" style="margin-left: 10px" />
  
      <!-- 查詢KD值 -->
      <el-button type="primary" @click="fetchKD" style="margin-left: 10px">查詢KD值</el-button>
  
      <!-- 傳送訊息 -->
      <el-button type="success" @click="sendMessage" style="margin-left: 10px">傳送訊息</el-button>
    </div>
  
    <!-- 回傳資訊 -->
    <div v-if="kdResult" style="margin-top: 20px;">
    <p>代碼：{{ kdResult.code }}</p>
    <p>日期：{{ kdResult.date }}</p>
    <p>K值：{{ kdResult.k }}</p>
    <p>D值：{{ kdResult.d }}</p>
    </div>
  
    <div v-if="messageResult" style="margin-top: 20px;">
      <p>伺服器回應訊息：{{ messageResult }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const code = ref('')
  const from = ref('')
  const to = ref('')
  
  const kdResult = ref(null)
  const messageResult = ref('')

  
  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  const fetchKD = async () => {
    const formattedFrom = formatDate(from.value)
    const formattedTo = formatDate(to.value)
  
    if (code.value && formattedFrom && formattedTo) {
      try {
        const response = await axios.get(`/stock/kdj/${code.value}?from=${formattedFrom}&to=${formattedTo}`)
        console.log('收到的資料：', JSON.stringify(response.data, null, 2))
        const dataStr = response.data // 例如："代碼：2330\n日期：2025-07-21\nK值：92.36\nD值：94.17"
      
      const parsed = parseKDString(dataStr)
      kdResult.value = parsed
    } catch (error) {
      console.error("API 錯誤:", error)
    }
    }
  }
  
    const sendMessage = async () => {
        if (!code.value) {
            messageResult.value = '請先輸入股票代號'
            return
        }
        try {
            const response = await axios.get(`/stock/sendKdj/${code.value}`)
            console.log('收到的資料：', JSON.stringify(response.data, null, 2))
            messageResult.value = response.data
            kdResult.value = null
        } catch (err) {
            console.error('傳送失敗：', err)
            messageResult.value = '傳送失敗，請確認伺服器有回應'
        }
    }
    const parseKDString = (str) => {
    const lines = str.split('\n')
    const result = {}
    lines.forEach(line => {
        const [key, value] = line.split('：')
        if (key.includes('代碼')) result.code = value
        else if (key.includes('日期')) result.date = value
        else if (key.includes('K')) result.k = value
        else if (key.includes('D')) result.d = value
    })
    return result
    }
  </script>
  