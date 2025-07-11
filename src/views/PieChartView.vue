<template>
  <div>
    <h2>查詢次數統計（前10名）</h2>
    <el-image
      :src="chartSrc"
      v-if="chartSrc"
      fit="contain"
      style="width: 700px"
    />
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
  
  