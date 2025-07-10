<template>
    <el-table :data="pagedData">
      <el-table-column prop="code" label="股票代號" />
      <el-table-column prop="name" label="名稱" />
      <el-table-column prop="price" label="價格" />
      <el-table-column prop="marketTime" label="時間" />
    </el-table>
    <el-pagination
      v-model:current-page="page"
      :page-size="5"
      :total="data.length"
      layout="prev, pager, next"
    />
  </template>
  <script setup>
  import { computed, ref } from 'vue'
  const props = defineProps({ data: Array })
  const page = ref(1)
  const pagedData = computed(() => props.data.slice((page.value - 1) * 5, page.value * 5))
  </script>