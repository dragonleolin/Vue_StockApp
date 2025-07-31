<template>
    <div class="chat-container">
      <div class="chat-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message"
          :class="msg.sender"
        >
          <strong>{{ msg.sender === 'user' ? '你' : 'AI' }}：</strong>
          {{ msg.content }}
        </div>
      </div>
  
      <div class="chat-input">
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          :disabled="!isConnected"
          placeholder="輸入訊息與 AI 對話..."
        />
        <button @click="sendMessage" :disabled="!isConnected">送出</button>
      </div>
  
      <div v-if="!isConnected" class="status">
        ⏳ 正在連線伺服器中...
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { Client } from '@stomp/stompjs'
  import SockJS from 'sockjs-client'
  
  const input = ref('')
  const messages = ref([])
  const isConnected = ref(false)
  
  let stompClient = null
  
  const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8082/ws/chat')
    socket.onopen = () => console.log("✅ SockJS opened")
    socket.onerror = (e) => console.error("❌ SockJS error", e)
    socket.onclose = () => console.warn("⚠️ SockJS closed")
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket 已連線')
        isConnected.value = true
  
        // 訂閱機器人回覆
        stompClient.subscribe('/topic/reply', (message) => {
            const reply = JSON.parse(message.body)
            messages.value.push({ sender: 'bot', content: reply.content })
            })
      },
      onStompError: (frame) => {
        console.error('🔴 STOMP 錯誤', frame)
      },
      onWebSocketClose: () => {
        isConnected.value = false
        console.warn('⚠️ WebSocket 已中斷')
      },
    })
  
    stompClient.activate()
  }
  
  const sendMessage = () => {
    if (!input.value.trim()) return
  
    if (!stompClient || !isConnected.value) {
      alert('尚未連線 WebSocket，請稍後再試')
      return
    }
  
    const userMessage = {
      content: input.value.trim(),
    }
  
    // 顯示使用者訊息
    messages.value.push({ sender: 'user', content: userMessage.content })
  
    // 傳送訊息給後端
    stompClient.publish({
        destination: '/app/chat/message',
        body: JSON.stringify(userMessage),
    })
  
    input.value = ''
  }
  
  onMounted(connectWebSocket)
  onBeforeUnmount(() => {
    if (stompClient) {
      stompClient.deactivate()
    }
  })
  </script>
  
  <style scoped>
  .chat-container {
    border: 1px solid #ccc;
    max-width: 500px;
    margin: auto;
    padding: 10px;
    border-radius: 8px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .chat-messages {
    max-height: 400px;
    overflow-y: auto;
    padding-bottom: 10px;
  }
  .message {
    margin: 5px 0;
    padding: 6px 10px;
    border-radius: 5px;
    max-width: 80%;
    word-break: break-word;
  }
  .user {
    background-color: #dcf8c6;
    align-self: flex-end;
  }
  .bot {
    background-color: #ececec;
    align-self: flex-start;
  }
  .chat-input {
    display: flex;
    gap: 10px;
  }
  .chat-input input {
    flex: 1;
    padding: 6px;
  }
  .chat-input button {
    padding: 6px 12px;
  }
  .status {
    color: #888;
    font-size: 14px;
    text-align: center;
  }
  </style>
  