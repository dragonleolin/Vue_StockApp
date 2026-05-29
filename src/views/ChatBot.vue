<template>
  <div class="chat-container hud-panel neon-border">
    <div class="chat-header">
      <h2 class="neon-title">🤖 智慧助理</h2>
      <span :class="['status', isConnected ? 'online' : 'offline']">
        {{ isConnected ? '🟢 SECURE' : '🔴 DISCONNECTED' }}
      </span>
    </div>

    <div class="chat-messages" ref="messageBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.sender === 'user' ? 'user' : 'ai']"
      >
        <div class="emoji-avatar">
          {{ msg.sender === 'user' ? '🧑' : '🤖' }}
        </div>

        <div class="bubble">
          <div class="content">{{ msg.content }}</div>
          <div class="time">{{ msg.sentAt }}</div>
        </div>
      </div>

      <div v-if="isTyping" class="message ai typing">
        <div class="emoji-avatar">🤖</div>
        <div class="bubble typing-bubble">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <span class="cmd-prompt">></span>
      <input
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        placeholder="INPUT_COMMAND..."
      />
      <button @click="sendMessage">[ EXECUTE ]</button>
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
const isTyping = ref(false);

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

  isTyping.value = true;
  scrollToBottom();

  if (isConnected.value && socket.value?.readyState === WebSocket.OPEN) {
    socket.value.send(JSON.stringify({ content }));
  } else {
    try {
      const response = await axios.post("http://localhost:8082/api/chat/send", {
        content,
      });
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
        content: "❌ 無法連線到核心伺服器",
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
/* =========================================
   主容器設定 (HUD 科技面板)
========================================= */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 4px;
  background: rgba(10, 12, 15, 0.85); /* 半透明深黑底 */
  backdrop-filter: blur(8px);
  overflow: hidden;
  position: relative;
  z-index: 10;
  font-family: monospace;
}

/* 霓虹邊框與折角 */
.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.1), inset 0 0 15px rgba(0, 240, 255, 0.1);
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
}

/* =========================================
   標題區塊
========================================= */
.chat-header {
  background: rgba(0, 240, 255, 0.1);
  border-bottom: 1px solid rgba(0, 240, 255, 0.4);
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.neon-title {
  font-size: 18px;
  color: #00F0FF;
  margin: 0;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(0, 240, 255, 0.8);
}

.status {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}
.status.online { color: #39FF14; animation: pulse 2s infinite; text-shadow: 0 0 5px #39FF14; }
.status.offline { color: #ff5252; text-shadow: 0 0 5px #ff5252; }

/* =========================================
   對話訊息區
========================================= */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 科技感卷軸 */
.chat-messages::-webkit-scrollbar { width: 6px; }
.chat-messages::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
.chat-messages::-webkit-scrollbar-thumb { background: #008b99; border-radius: 3px; }

/* 對話區塊基礎設定 */
.message {
  display: flex;
  align-items: flex-end;
  width: 100%;
  animation: fadeIn 0.3s ease-out forwards;
}

/* 🧑 User 區塊設定 */
.message.user { 
  flex-direction: row-reverse; 
  /* 🌟 把原本的 justify-content: flex-end; 刪除即可！
     因為 row-reverse 預設就會從右邊(起點)開始排 */
}

.message.ai { 
  justify-content: flex-start; 
}

.emoji-avatar {
  font-size: 24px;
  margin: 0 10px;
  filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));
}

/* 氣泡基礎設定 */
.bubble {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
  word-break: break-word;
  font-size: 15px;
  line-height: 1.5;
}

/* 🧑 User 氣泡 (黑金配色) */
.message.user .bubble {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.5);
  color: #FFD700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.1);
  border-bottom-right-radius: 0;
}

/* 🤖 AI 氣泡 (青藍配色) */
.message.ai .bubble {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.4);
  color: #E2F1F8;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
  border-bottom-left-radius: 0;
}

.time {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 8px;
  text-align: right;
  letter-spacing: 1px;
}
.message.user .time { color: #FFD700; }
.message.ai .time { color: #00F0FF; }

/* =========================================
   輸入框區塊 (終端機風格)
========================================= */
.chat-input {
  display: flex;
  padding: 16px;
  background: rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(0, 240, 255, 0.3);
  align-items: center;
}

.cmd-prompt {
  color: #39FF14;
  font-weight: bold;
  margin-right: 12px;
  font-size: 18px;
  animation: blink 1s infinite;
}

.chat-input input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #E2F1F8;
  font-family: monospace;
  font-size: 15px;
}
.chat-input input::placeholder {
  color: rgba(0, 240, 255, 0.3);
}

.chat-input button {
  background: rgba(0, 240, 255, 0.1);
  color: #00F0FF;
  border: 1px solid #00F0FF;
  padding: 8px 16px;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
}
.chat-input button:hover {
  background: #00F0FF;
  color: #000;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
}

/* =========================================
   打字中動畫
========================================= */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #00F0FF;
  border-radius: 50%;
  box-shadow: 0 0 5px #00F0FF;
  animation: typing 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

/* =========================================
   Keyframes
========================================= */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes typing { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>