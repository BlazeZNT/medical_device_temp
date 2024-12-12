<template>
  <div class="chatbot-container">
    <div class="chatbot-messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="message.isUser ? 'user-message' : 'bot-message'"
      >
        {{ message.text }}
      </div>
    </div>
    <div class="chatbot-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const messages = ref([]);
const userInput = ref("");

const sendMessage = async () => {
  if (userInput.value.trim() === "") return;

  const userMessage = {
    id: Date.now(),
    text: userInput.value,
    isUser: true,
  };
  messages.value.push(userMessage);
  userInput.value = "";

  // Simulate bot response
  const botResponse = await fetchBotResponse(userMessage.text);
  messages.value.push({
    id: Date.now(),
    text: botResponse,
    isUser: false,
  });
};

const fetchBotResponse = async (userMessage) => {
  try {
    const response = await fetch("http://localhost:8080/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};
</script>

<style scoped>
.chatbot-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
}
.chatbot-messages {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: #f9f9f9;
}
.user-message {
  text-align: right;
  margin: 5px 0;
}
.bot-message {
  text-align: left;
  margin: 5px 0;
}
.chatbot-input {
  display: flex;
  padding: 10px;
  background: #fff;
}
.chatbot-input input {
  flex: 1;
  padding: 5px;
}
.chatbot-input button {
  margin-left: 5px;
  padding: 5px 10px;
}
</style>