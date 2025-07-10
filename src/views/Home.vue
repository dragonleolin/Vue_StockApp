<template>
    <stock-form @update="data = $event" />
    <result-list :data="data" />
  </template>
  <script setup>
  import StockForm from '../components/StockForm.vue'
  import ResultList from '../components/ResultList.vue'
  import { ref } from 'vue'
  const data = ref([])
  </script>