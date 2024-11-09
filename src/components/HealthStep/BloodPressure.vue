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
        <div class="charsBox">
          <div class="charsItem" v-for="(item, index) in dataList" :key="index">
            <GaugePie
              :title="item.title"
              :subTitle="item.projectName"
              :value="item.value"
              :min="item.min"
              :max="item.max"
              :unit="item.unit"
            ></GaugePie>
          </div>
          <div class="charsItem charsItem2">
            <div
              class="charsItem"
              v-for="(item, index) in dataList2"
              :key="index"
            >
              <GaugePie2
                :title="item.title"
                :subTitle="item.projectName"
                :value="item.value"
                :min="item.min"
                :max="item.max"
                :unit="item.unit"
              ></GaugePie2>
            </div>
          </div>
        </div>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox
        img="../../static/health/healper/5.png"
        :tips="tips"
        @next="handleClickNext"
        v-if="showHeapler"
      ></HelperBox>
    </view>
  </ContentBox>
</template>
	  
	  <script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import BasicButton from "@/components/BasicButton/index.vue";
import GaugePie from "../Charts/GaugePie.vue";
import GaugePie2 from "../Charts/GaugePie2.vue";

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});
const tips = `1.Stand on the height measurement device.<br>2.Press the start button  on the device`;

const dataList = ref([
  {
    title: "PULSE",
    projectName: "pulse/min",
    value: 0,
    min: 0,
    max: 100,
    unit: "",
  },
]);

const dataList2 = ref([
  {
    title: "SYSTOLIC",
    projectName: "PRBPM",
    value: 0,
    min: 0,
    max: 100,
    unit: "mm Hg",
  },
  {
    title: "DIASTOLIC",
    projectName: "PRBPM",
    value: 0,
    min: 0,
    max: 100,
    unit: "mm Hg",
  },
]);

const myChart = ref(null);

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
};

let timer = ref(null);
const handleClickStart = () => {
  timer.value = setInterval(() => {
    dataList.value[0].value = generateRandomNumber(0, 100);
	dataList2.value[0].value = generateRandomNumber(0, 100);
    dataList2.value[1].value = generateRandomNumber(0, 100);
    console.log(dataList.value);
  }, 1000);
};

onMounted(() => {});

onUnmounted(() => {
  timer.value && clearInterval(timer.value);
});

function generateRandomNumber(min, max) {
  // 生成一个介于 min 和 max 之间的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

.charsBox {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  .charsItem {
    flex: 1;
    height: 100%;
    &.charsItem2 {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>