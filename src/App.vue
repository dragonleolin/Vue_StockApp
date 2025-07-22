<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" :default-active="route.path" router>
        <el-menu-item index="/">股票查詢</el-menu-item>
        <el-menu-item index="/chart">歷史圖表</el-menu-item>
        <el-menu-item index="/cache">快取管理</el-menu-item>
        <el-menu-item index="/query-pie">圓餅統計</el-menu-item>
        <el-menu-item index="/fugle-kdj">kdj</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()
</script>
