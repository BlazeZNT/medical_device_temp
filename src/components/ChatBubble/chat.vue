<template>
  <view class="chat-bubble">
    What can I help you today?
  </view>
</template>

<script>
export default {
  name: "ChatBubble",
};
</script>

<style>
.chat-bubble {
  display: inline-block;
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.1); /* Transparent background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border */
  border-radius: 20px; /* Rounded corners for the bubble effect */
  font-size: 16px;
  color: white; /* Text color */
  text-align: center;
  max-width: 80%; /* Limit width */
  margin: 10px 0; /* Space around the bubble */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}
</style>