import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChartView from '../views/ChartView.vue'
import CacheView from '../views/CacheView.vue'
import PieChartView from '../views/PieChartView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/chart', component: ChartView },
  { path: '/cache', component: CacheView },
  { path: '/query-pie', component: PieChartView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})