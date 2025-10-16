<template>
  <div class="chat-container">
    <!-- 🟦 標題 -->
    <div class="chat-header">
      <h2>🤖 AI 聊天機器人</h2>
      <span :class="['status', isConnected ? 'online' : 'offline']">
        {{ isConnected ? '🟢 已連線' : '🔴 未連線' }}
      </span>
    </div>

    <!-- 💭 對話訊息 -->
    <div class="chat-messages" ref="messageBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.sender === 'user' ? 'user' : 'ai']"
      >
        <div class="emoji-avatar">
          {{ msg.sender === 'user' ? '🧑‍💻' : '🤖' }}
        </div>

        <div class="bubble">
          <div class="content">{{ msg.content }}</div>
          <div class="time">{{ msg.sentAt }}</div>
        </div>
      </div>

      <!-- 🕓 AI 打字中動畫 -->
      <div v-if="isTyping" class="message ai typing">
        <div class="emoji-avatar">🤖</div>
        <div class="bubble typing-bubble">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>

    <!-- ⌨️ 輸入框 -->
    <div class="chat-input">
      <input
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        placeholder="輸入訊息..."
      />
      <button @click="sendMessage">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import axios from "axios";

const messages = ref([]);
const inputMessage = ref("");
const socket = ref(null);
const isConnected = ref(false);
const messageBox = ref(null);
const isTyping = ref(false); // 👈 新增：AI 正在輸入中狀態

// 📡 初始化 WebSocket
const initWebSocket = () => {
  try {
    socket.value = new WebSocket("ws://localhost:8082/ws/chat");

    socket.value.onopen = () => {
      console.log("✅ WebSocket 已連線");
      isConnected.value = true;
    };

    socket.value.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      // 收到訊息前取消「打字中」
      isTyping.value = false;

      messages.value.push({
        sender: msg.sender || "AI",
        content: msg.content,
        sentAt: msg.sentAt,
      });
      scrollToBottom();
    };

    socket.value.onclose = () => {
      console.log("🔌 WebSocket 已關閉");
      isConnected.value = false;
    };

    socket.value.onerror = (err) => {
      console.error("❌ WebSocket 錯誤:", err);
      isConnected.value = false;
    };
  } catch (error) {
    console.error("⚠️ 初始化 WebSocket 失敗：", error);
  }
};

// 📤 傳送訊息
const sendMessage = async () => {
  const content = inputMessage.value.trim();
  if (!content) return;

  const now = new Date().toLocaleString("zh-TW");
  messages.value.push({
    sender: "user",
    content,
    sentAt: now,
  });
  inputMessage.value = "";

  // 顯示 AI 打字中動畫
  isTyping.value = true;
  scrollToBottom();

  if (isConnected.value && socket.value?.readyState === WebSocket.OPEN) {
    socket.value.send(JSON.stringify({ content }));
  } else {
    try {
      const response = await axios.post("http://localhost:8082/api/chat/send", {
        content,
      });
      // 模擬 AI 打字延遲
      setTimeout(() => {
        isTyping.value = false;
        messages.value.push({
          sender: "AI",
          content: response.data,
          sentAt: new Date().toLocaleString("zh-TW"),
        });
        scrollToBottom();
      }, 1000);
    } catch (e) {
      isTyping.value = false;
      messages.value.push({
        sender: "system",
        content: "❌ 無法連線到伺服器",
        sentAt: new Date().toLocaleString("zh-TW"),
      });
    }
  }
};

// 📜 捲到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight;
  }
};

onMounted(initWebSocket);
onBeforeUnmount(() => {
  socket.value?.close();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 400px;
  margin: 20px auto;
  border-radius: 16px;
  overflow: hidden;
  background: #f5f5f5;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.chat-header {
  background: #4a90e2;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status.online {
  color: #b2ff59;
}
.status.offline {
  color: #ff5252;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 對話區塊 */
.message {
  display: flex;
  align-items: flex-end;
}
.message.user {
  justify-content: flex-end;
}
.message.ai {
  justify-content: flex-start;
}

/* emoji 頭像 */
.emoji-avatar {
  font-size: 24px;
  line-height: 1;
  margin: 0 6px;
}

/* 氣泡 */
.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 14px;
  margin: 0 4px;
  background: white;
  position: relative;
  word-break: break-word;
}

.message.user .bubble {
  background: #4a90e2;
  color: white;
  border-bottom-right-radius: 2px;
}

.message.ai .bubble {
  background: #e0e0e0;
  border-bottom-left-radius: 2px;
}

.time {
  font-size: 0.75em;
  opacity: 0.6;
  margin-top: 4px;
  text-align: right;
}

/* 輸入框 */
.chat-input {
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.chat-input button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.chat-input button:hover {
  background: #357abd;
}

/* 打字中動畫 */
.typing-bubble {
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50px;
  padding: 10px;
  border-radius: 14px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #555;
  border-radius: 50%;
  animation: typing 1.2s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-4px); }
}
</style>
