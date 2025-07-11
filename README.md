# 建立專案
1. 建立專案 npm init vite@latest vue-stock-chart --template vue
    ```
        npm install
        npm install vue-router element-plus axios chart.js vue-chartjs
    ```
2. 【目錄結構】
        src/
        ├── App.vue
        ├── main.js
        ├── router/
        │   └── index.js
        ├── views/
        │   ├── Home.vue
        │   ├── ChartView.vue
        │   ├── CacheView.vue
        │   └── PieChartView.vue
        ├── components/
        │   ├── StockForm.vue
        │   └── ResultList.vue
        └── assets/

3. 啟動應用程式 npm run dev
4. 注意事項：
    - 可使用你現有的後端 Redis 查詢資料與圖表服務 (也可以是純 JSON 資料)
    - 若跨域問題請加 CORS 設定
    - 如需整合圖片格式可考慮 base64 圖片由後端傳出，但會較難互動建議用圖表資料前端處理
5. 把專案弄成靜態網頁教學: https://ithelp.ithome.com.tw/articles/10339484
6. 指令 npm run build 產生 dist 資料夾內容

## API 功能說明	Vue 畫面位置
股票查詢 /stock	Home.vue + StockForm.vue
圖表產生 /stock/chart	ChartView.vue
快取管理相關 /cache/*	CacheView.vue
查詢次數統計圖 /query-count	PieChartView.vue