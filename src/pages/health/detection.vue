<template>
  <LayoutContent>
    <view class="pageView">
      <view class="leftCard">
        <view class="leftCardTitle">
          <uni-icons type="home" color="#58FFCF" size="34"></uni-icons>
          <view class="line">|</view>
          <view class="title">General Checkup</view>
        </view>
        <scroll-view scroll-y="true" class="scrollMenu">
          <view
            class="menuItem"
            :class="active == item.name ? 'active' : ''"
            v-for="(item, key) in ProjectList"
            :key="key"
            @click="handleClickMenu(item, key)"
          >
            <view class="icon">
              <image :src="getImg(item.icon)"></image>
            </view>
            {{ item.name }}
          </view>
        </scroll-view>
      </view>
      <view class="pageView-content">
        <component :is="stepComponent" @callback="handleCallback" @printResults="printResults"></component>
      </view>
    </view>
  </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import BtnCard from "@/components/Card/BtnCard.vue";
import Height from "@/components/HealthStep/Height.vue";
import Weight from "@/components/HealthStep/Weight.vue";
import Temperature from "@/components/HealthStep/Temperature.vue";
import Oximeter from "@/components/HealthStep/Oximeter.vue";
import BloodPressure from "@/components/HealthStep/BloodPressure.vue";
import Spirometer from "@/components/HealthStep/Spirometer.vue";
import Egc from "@/components/HealthStep/Egc.vue";
import BloodSugar from "@/components/HealthStep/Bloodsugar.vue";
import Cholestrol from "@/components/HealthStep/Cholesterol.vue";

import { ref, reactive, shallowRef } from "vue"; 

const ProjectList = {
  Height: {
    icon: "../../static/health/icons/2.png",
    name: "HEIGHT",
    component: Height,
  },
  Weight: {
    icon: "../../static/health/icons/1.png",
    name: "WEIGHT",
    component: Weight,
  },
  Temperature: {
    icon: "../../static/health/icons/3.png",
    name: "TEMPERATURE",
    component: Temperature,
  },
  Oximeter: {
    icon: "../../static/health/icons/4.png",
    name: "OXIMETER",
    component: Oximeter,
  },
  BloodPressure: {
    icon: "../../static/health/icons/5.png",
    name: "BLOOD PRESSURE",
    component: BloodPressure,
  },
  Spirometer: {
    icon: "../../static/health/icons/5.png",
    name: "SPIROMETER",
    component: Spirometer,
  },
  Egc: {
    icon: "../../static/health/icons/5.png",
    name: "Egc",
    component: Egc,
  },
  BloodSugar: {
    icon: "../../static/health/icons/5.png",
    name: "Blood Sugar",
    component: BloodSugar,
  },
  Cholesterol: {
    icon: "../../static/health/icons/4.png",
    name: "Cholestrol",
    component: Cholestrol,
  },
};

const stepComponent = shallowRef(Height);

const Components = {
  Height,
};

const active = ref("HEIGHT");

// 使用 reactive 创建响应式状态
const state = reactive({
  step: 1,
});


const printModule = uni.requireNativePlugin('Leiye-Print')

const printResults = () => {
  console.log('printResults')
  const devicesRes = printModule.initDevice()
  if (devicesRes.code !== 'success') {
    console.log('devicesRes', devicesRes)
    uni.showToast({
      title: 'Failed to initialize printer',
      icon: 'none'
    })
    return
  }
  dataList.value.forEach(item => {
    printModule.printText(item.name + '\t' +item.value +'\n')
  })
  printModule.printText('\n\n\n\n')
}

const handleClickMenu = (item, key) => {
  stepComponent.value = item.component;
  active.value = item.name;
};

const handleClickCard = () => {
  slibrary.$router.go("/pages/health/detection");
};

const dataList = ref([]);

const handleCallback = (data) => {
	console.log(data);
  // 根据name查找对应项目避免重复
  const index = dataList.value.findIndex(item => item.name === data.name)
  if (index !== -1) {
    dataList.value[index].value = data.value
  } else {
    dataList.value.push(data)
  }
}

const getImg = (url) => {
  //正确方法
  return url
};
</script>

<style lang="scss" scoped>
.pageView {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .leftCard {
    width: 197.4rpx;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #2b3138 0%, #2b3138 100%, #1f252c 100%);
    // opacity: 0.6;
    flex-shrink: 0;

    .leftCardTitle {
      flex-shrink: 0;
      padding: 15rpx;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 11rpx;
      color: #ffffff;
      line-height: 14rpx;

      .line {
        margin: 0 6rpx;
        color: #58ffcf;
      }
    }

    .scrollMenu {
      width: 100%;
      flex: 1;
      overflow: hidden;
      padding: 0 15rpx;

      .menuItem {
        display: flex;
        align-items: center;
        background: linear-gradient(
          270deg,
          rgba(40, 46, 53, 0.8) 0%,
          rgba(50, 61, 73, 0.8) 100%
        );
        border-radius: 10rpx 10rpx 10rpx 10rpx;
        padding: 15rpx 15rpx;
        color: #fff;
        font-size: 8rpx;
        color: #ffffff;
        line-height: 11rpx;
        margin-bottom: 11rpx;

        .icon {
          width: 16.67rpx;
          height: 16.67rpx;
          background: #fff;
          border-radius: 100%;
          padding: 4rpx;
          margin-right: 10rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        &.active {
          background: linear-gradient(
            270deg,
            rgba(88, 255, 207, 0.9) 0%,
            rgba(60, 110, 255, 0.9) 43%,
            rgba(42, 48, 55, 0.9) 100%
          );
          border-radius: 10rpx 10rpx 10rpx 10rpx;

          .icon {
            background: linear-gradient(180deg, #5beaff 0%, #58ffcf 100%);
          }
        }
      }
    }
  }

  .pageView-content {
    flex: 1;
    overflow: hidden;
  }
}

:deep() {
  .content-box {
    padding: 0 !important;
  }

  .menuItem .uni-icons {
    line-height: 13px;
  }
}
</style>