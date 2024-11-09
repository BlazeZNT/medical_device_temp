<template>
  <view class="page">
    <Header />
    <view class="content">
      <view class="content-border-box">
        <view class="content-box">
          <slot></slot>
        </view>
        <view class="back" v-if="props.showBack" @click="handleClickBack">
          <image src="@/static/back.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import Header from "./Header.vue";
const props = defineProps({
  showBack: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["back"]);

const handleClickBack = () => {
  emit("back");
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  border-radius: 2px solid blue;
  background-image: url("@/static/bgImage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #1f252c;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .content {
    width: 100%;
    flex: 1;
    overflow: hidden;
    padding: 30px;
    padding-top: 0;
    position: relative;

    .back {
      position: absolute;
      width: 29.17rpx;
      height: 29.17rpx;
      left: 18rpx;
      top: 18rpx;
      transform: scale(1.5);

      image {
        width: 100%;
        height: 100%;
      }
    }

    .content-border-box {
      padding: 1px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: linear-gradient(
        238deg,
        rgba(88, 255, 207, 1),
        rgba(27, 48, 42, 1)
      );
      border-radius: 24px;
      position: relative;

      .content-box {
        width: 100%;
        height: 100%;
        position: relative;
        /* 相对定位 */
        border-radius: 24px;
        /* 圆角 */
        padding: 16px;
        /* 内边距 */
        background: linear-gradient(
          181deg,
          rgba(35, 42, 49, 1) 0%,
          rgba(27, 32, 40, 1) 100%
        );
        overflow: hidden;
        /* 防止内容溢出 */
      }
    }
  }
}
</style>