<template>
  <el-form @submit.prevent="fetchStocks">
    <el-input v-model="codes" placeholder="輸入股票代號例如: 2330,0050" style="width: 300px" />
    <el-button @click="fetchStocks">查詢</el-button>
  </el-form>
</template>
<script setup>
import axios from 'axios'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['update'])
const codes = ref('')
const fetchStocks = async () => {
  const res = await axios.post('/stock', { codes: codes.value.split(',') })
  emit('update', res.data)
}
</script>