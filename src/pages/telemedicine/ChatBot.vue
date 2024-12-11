<template>
  <view class="chat-container">
    <view class="chat-box">
      <view v-for="(message, index) in chatHistory" :key="index" :class="message.role">
        <text>{{ message.content }}</text>
      </view>
    </view>
    <view class="input-box">
      <input
        v-model="userInput"
        placeholder="Type your message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      chatHistory: [
        { role: "assistant", content: "Hello! How can I help you today?" },
      ],
      // apiKey: "addkeyhere", // Use a secure method to store your key
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      // Add user's message to the chat history
      this.chatHistory.push({ role: "user", content: this.userInput });
      const message = this.userInput;
      this.userInput = "";

      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: "https://api.openai.com/v1/chat/completions",
            method: "POST",
            header: {
              Authorization: `Bearer ${this.apiKey}`,
              "Content-Type": "application/json",
            },
            data: {
              model: "gpt-3.5-turbo",
              messages: this.chatHistory,
              max_tokens: 150,
            },
            success: (response) => resolve(response),
            fail: (error) => reject(error),
          });
        });

        // Debugging: Log the full response
        console.log("Full response:", res);

        // Extract reply
        const reply =
          res.data?.choices && res.data.choices.length > 0
            ? res.data.choices[0].message.content
            : "No valid response from API.";

        // Add assistant's reply to the chat history
        this.chatHistory.push({ role: "assistant", content: reply });
      } catch (error) {
        console.error("Error response:", error.response?.data || error);
        this.chatHistory.push({
          role: "assistant",
          content: "An error occurred. Please try again later.",
        });
      }
    },
  },
};
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  background-color: #f5f5f5;
}
.chat-box {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}
.chat-box .user {
  text-align: right;
  color: blue;
}
.chat-box .assistant {
  text-align: left;
  color: green;
}
.input-box {
  display: flex;
  gap: 10px;
}
</style>