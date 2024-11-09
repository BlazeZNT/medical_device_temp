<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  padding: 1px;
  background-color: transparent;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, #2f3a44 0%, #192228 100%),
    linear-gradient(180deg, rgba(#58ffcf, 1) 0%, rgba(#162025, 1) 100%);
  border-radius: 8rpx;
  background-clip: content-box, padding-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>