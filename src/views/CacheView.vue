<template>
  <div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="📦 查詢全部快取" name="all">
        <el-button type="primary" @click="getAll">查詢全部快取</el-button>

        <el-table :data="cache" style="margin-top: 20px" :stripe="true" :border="true">
          <el-table-column prop="code" label="代碼" />
          <el-table-column prop="name" label="名稱" />
          <el-table-column prop="price" label="價格" />
          <el-table-column prop="marketTime" label="時間" />
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="🧰 進階快取操作" name="advanced">
        <el-form inline label-width="80px" style="margin-bottom: 20px">
          <el-form-item label="股票代號">
            <el-input v-model="code" placeholder="輸入代號" style="width: 150px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getCacheByCode">查詢該代號所有快取</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="cacheByCode" v-if="cacheByCode.length > 0" style="margin-bottom: 20px" :stripe="true" :border="true">
          <el-table-column prop="code" label="代碼" />
          <el-table-column prop="name" label="名稱" />
          <el-table-column prop="price" label="價格" />
          <el-table-column prop="marketTime" label="時間" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const activeTab = ref('all')
const cache = ref([])
const cacheByCode = ref([])
const code = ref('')

const latestData = ref(null) // ⭐ 修正這裡，原本未宣告

const getAll = async () => {
  const res = await axios.get('/stock/cache')
  cache.value = res.data
}

const clearAll = async () => {
  await axios.delete('/stock/cache/clear')
  cache.value = []
  cacheByCode.value = []
  latestData.value = null
}

const getCacheByCode = async () => {
  const res = await axios.get(`/stock/cache/${code.value}`)
  cacheByCode.value = res.data
}

const getLatestByCode = async () => {
  try {
    const res = await axios.get(`/stock/cache/${latestCode.value}/latest`);
    latest.value = res.data;
  } catch (e) {
    console.error("取得最新資料失敗", e);
  }
}
</script>
