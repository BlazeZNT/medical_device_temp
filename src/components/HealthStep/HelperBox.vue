<template>
  <view class="helperBorderBox">
    <view class="helperContent">
      <view class="imgBox">
        <image :src="props.img" mode="widthFix"></image>
      </view>
      <view class="title"> Steps to follow </view>
      <view class="desc" v-if="props.tips" v-html="props.tips">
      </view>
      <view class="btn">
        <BasicButton @click="handleClickBtn"> Start </BasicButton>
      </view>
    </view>
  </view>
</template>

<script setup>
import BasicButton from "@/components/BasicButton/index.vue";

const props = defineProps({
  img: {
    type: String,
    default: ''
  },
  tips: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['next'])
const handleClickBtn = () => {
    emit('next')
}
</script>

<style lang="scss" scoped>
.helperBorderBox {
  padding: 1px;
  width: 316.15rpx;
  height: 348.44rpx;
  overflow: hidden;
  background: linear-gradient(
    238deg,
    rgba(88, 255, 207, 1),
    rgba(27, 48, 42, 1)
  );
  border-radius: 24px;
  position: relative;
  .helperContent {
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
    padding: 33rpx;

    .imgBox {
      width: 187.5rpx;
      height: 105.21rpx;
      background: #fff;
      border-radius: 5rpx;
    }

    .title {
      font-weight: 600;
      font-size: 13rpx;
      color: #06ffb8;
      line-height: 15rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-top: 20rpx;
    }

    .desc {
      font-family: FL;
      font-weight: 300;
      font-size: 11rpx;
      color: #ffffff;
      line-height: 17rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-top: 20rpx;
    }
  }
  .btn {
    margin-top: 40rpx;
    width: 155.21rpx;
  }
}
</style>