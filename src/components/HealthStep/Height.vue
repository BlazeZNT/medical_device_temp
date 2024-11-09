<template>
  <ContentBox>
    <view style="display: flex; flex-direction: column; align-items: center" >
      <view v-if="!showHeapler">
        <view class="title">HEIGHT</view>
        <view class="number"> 0 <em>cm</em> </view>
        <view class="container">
          <view class="heightBox">
			<view class="scrollBox">
			</view>
		  </view>
        </view>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox @next="handleClickNext" img="../../static/health/healper/2.png" tips="1.Stand on the height measurement device<br />2.Press the start button on the device" v-if="showHeapler"></HelperBox>
    </view>
  </ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import BasicButton from "@/components/BasicButton/index.vue";

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});

const state = reactive({});

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
});

function onScroll(event) {}

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
};
const handleClickStart = () => {
  weightValue.value = Math.floor(Math.random() * 301);
};

// 在组件卸载前清理定时器
onBeforeUnmount(() => {
  // if (interval) {
  // 	clearInterval(interval); // 清理定时器
  // }
});
</script>


<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.btnsbox {
  width: 155.21rpx;
}

.title {
  width: 100%;
  text-align: center;
  font-family: FB;
  font-weight: 800;
  font-size: 17rpx;
  color: #12ffbb;
  line-height: 11rpx;
  letter-spacing: 3px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 20rpx;
}

.number {
  width: 100%;
  text-align: center;
  font-family: FB;
  font-weight: 700;
  font-size: 52rpx;
  color: #ffffff;
  line-height: 63rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 20rpx;
  em {
    font-family: FB;
    font-weight: 700;
    font-size: 16rpx;
    color: rgba(#ffffff, 0.5);
    line-height: 19rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.container {
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  .heightBox {
    width: 40rpx;
    height: 180rpx;
    background: linear-gradient(90deg, #03f8b2 0%, #395fc2 100%);
    // box-shadow: 0rpx 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.25);
    border-radius: 5rpx 5rpx 5rpx 5rpx;
    position: relative;

	.scrollBox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      top: -2rpx;
      height: 108rpx;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, #20282e 0%, rgba(29, 37, 43, 0) 100%);
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      background: linear-gradient(180deg, rgba(29, 37, 43, 0) 0%, #1f252c 100%);
      bottom: -1rpx;
      height: 108rpx;
      left: 0;
      right: 0;
    }
  }
}
</style>