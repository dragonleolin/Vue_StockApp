<template>
    <div>
      <h2>查詢次數統計（前10名）</h2>
      <el-image :src="chartSrc" fit="contain" style="width: 600px;" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const chartSrc = ref('');
  
  onMounted(() => {
    chartSrc.value = 'http://localhost:8082/stock/chart/query-count?t=' + new Date().getTime(); // 加時間防快取
  });
  </script>
  