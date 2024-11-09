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
        <view class="charts" style="width: 100%; height: 100%">
          <view style="width: 100%; height: 100%"
            ><l-echart ref="chartRef"></l-echart
          ></view>
        </view>
        <view class="dataBox">
          <view class="dataBox-item">
            <view class="label">FVC</view>
            <view class="value">4.43 <i>L</i></view>
          </view>
          <view class="dataBox-item">
            <view class="label">FEV 1</view>
            <view class="value">2.56 <i>L</i></view>
          </view>
          <view class="dataBox-item">
            <view class="label">FEV 1 / FVC</view>
            <view class="value">60 <i>%</i></view>
          </view>
          <view class="dataBox-item">
            <view class="label">FEF 25-75%</view>
            <view class="value">1.26 <i>L/sec</i></view>
          </view>
          <view class="dataBox-item">
            <view class="label">PEF</view>
            <view class="value">9.21 <i>L/sec</i></view>
          </view>
        </view>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox
        @next="handleClickNext"
        img="../../static/health/healper/6.png"
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

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});

const chartRef = ref(null);

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
});

const myChart = ref(null);

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
  setTimeout(async () => {
    if (!chartRef.value) return;
    myChart.value = await chartRef.value.init(echarts);
    myChart.value.setOption(option.value);
  }, 300);
};
const handleClickStart = () => {};


onBeforeUnmount( () => {
	if (myChart.value) {
		myChart.value.dispose()
	}
})

const option = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: Array.from({ length: 13 }, (_, i) => i),
      axisLabel: {
        show: false, // 隐藏 X 轴的刻度标签
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#333",
        },
      },
    },
    yAxis: {
      type: "value",
      max: 12,
      axisLabel: {
        show: false, // 隐藏 Y 轴的数值
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: function (params) {
            return params.value === 0 ? "#333" : "transparent"; // 仅显示 0 刻度线
          },
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisTick: {
        show: false, // 隐藏刻度
      },
    },
    series: [
      {
        name: "Flow",
        type: "line",
        smooth: true,
        data: [0, 2, 5, 8, 10, 12, 10, 8, 5, 2, 1, 0, 0],
        lineStyle: {
          width: 3,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#33CCFF" },
              { offset: 1, color: "#66FF66" },
            ],
          },
        },
      },
      {
        name: "Volume",
        type: "line",
        smooth: true,
        data: [0, -1, -3, -5, -8, -10, -8, -5, -3, -1, 0, 0, 0],
        lineStyle: {
          width: 3,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#9933FF" },
              { offset: 1, color: "#FF6633" },
            ],
          },
        },
      },
    ],
  };
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

.dataBox {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  height: 99.48rpx;
  margin-bottom: 10rpx;

  .dataBox-item {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #364351 0%, rgba(31, 37, 45, 0) 100%);
    border: 1rpx solid;
    border-image: linear-gradient(
        180deg,
        rgba(88.00000235438347, 255, 207.00000286102295, 1),
        rgba(32.00000189244747, 38.0000015348196, 45.00000111758709, 1)
      )
      1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
      font-family: FB;
      font-weight: 700;
      font-size: 8rpx;
      color: #12ffbb;
      line-height: 11rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-bottom: 8rpx;
    }

    .value {
      font-family: FL;
      font-weight: 700;
      font-size: 17rpx;
      color: #ffffff;
      line-height: 11rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;

      i {
        font-size: 10rpx;
      }
    }
  }
}
</style>