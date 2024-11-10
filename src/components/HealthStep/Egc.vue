<template>
  <ContentBox>
    <view
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <view
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
        v-if="!showHeapler"
      >
        <view class="chartsBox" style="width: 100%; height: 100%">
          <view class="charts-item">
            <miniLineCart title="I" />
          </view>
          <view class="charts-item">
            <miniLineCart title="aVR" />
          </view>
          <view class="charts-item">
            <miniLineCart title="II" />
          </view>
          <view class="charts-item">
            <miniLineCart title="aVR" />
          </view>
          <view class="charts-item">
            <miniLineCart title="III" />
          </view>
          <view class="charts-item">
            <miniLineCart title="aVR" />
          </view>
        </view>
        <view class="xin">
          <view class="left">
            <view class="icon">
              <image src="../../static/health/xin.png"></image>
            </view>
            <view class="box">
              <view class="label">BPM</view>
              <view class="value">0</view>
            </view>
          </view>
          <view class="right">
            <view class="label">Recording time</view>
            <view class="value">00:00</view>
          </view>
        </view>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox
        @next="handleClickNext"
        img="../../static/health/healper/7.png"
        tips="1.Blow on the measurement device<br />2.Press the start button on the device"
        v-if="showHeapler"
      ></HelperBox>
    </view>
  </ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import BasicButton from "@/components/BasicButton/index.vue";
import miniLineCart from "../Charts/miniLineCart.vue";
const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});

const chartRef = ref(null);

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
});

const handleClickStart = () => {
	
}

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .num {
    color: #fff;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }
}

.modelbtn {
  width: 160rpx;
  height: 40rpx;
  color: #fff;
  background: #56ccf2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  margin-top: 40rpx;
}

.btnsbox {
  width: 155.21rpx;
  flex-shrink: 0;
}

.sitchBtn {
  width: 91.15rpx;
  height: 25rpx;
  background: #303a45;
  border-radius: 3rpx 3rpx 3rpx 3rpx;
  padding: 3rpx 4rpx;
  display: flex;
  overflow: hidden;
  margin-bottom: 20rpx;

  .sitchBtn-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    border-radius: 3rpx 3rpx 3rpx 3rpx;
    font-family: FB;
    font-weight: 800;
    font-size: 8rpx;
    color: #fff;
    line-height: 10rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;

    &.active {
      background: #12ffbb;
      color: #000;
    }
  }
}

.chartsBox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 10rpx;
  grid-row-gap: 10rpx;

  .charts-item {
    width: 100%;
    height: 100%;
  }
}
.xin {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  .left {
    margin-right: 40rpx;
    display: flex;
    align-items: center;
    .icon {
      width: 26.16rpx;
      height: 23.85rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .box {
      .label {
        font-family: Figtree, Figtree;
        font-weight: 400;
        font-size: 12rpx;
        color: #ffffff;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .value {
        font-family: Figtree, Figtree;
        font-weight: 800;
        font-size: 29rpx;
        color: #ffffff;
        line-height: 35rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
  .right {
    .label {
      font-family: Figtree, Figtree;
      font-weight: 400;
      font-size: 8rpx;
      color: #ffffff;
      line-height: 10rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .value {
      font-family: Figtree, Figtree;
      font-weight: 800;
      font-size: 29rpx;
      color: #ffffff;
      line-height: 35rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
