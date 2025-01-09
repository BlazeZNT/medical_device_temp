<template>
  <LayoutContent>
    <view class="pageView">
      <view class="leftCard">
        <view class="leftCardTitle">
          <uni-icons type="home" color="#58FFCF" size="34"></uni-icons>
          <view class="line">|</view>
          <view class="title">Eye Assessment</view>
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
		  <view class="menuimgbox">
			  <image src="@/static/Eye/whiteback.png" alt="Left Arrow" class = "menuimg"></image>
			  <text class="regular">Pupil Size 4.0 mm</text>
		  </view>
        </scroll-view>
      </view>
      <view class="pageView-content">
        <component :is="stepComponent" @startButtonClicked="changestage" @stopButtonClicked = "stopbutton"></component>
      </view>
    </view>
  </LayoutContent>	
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import BtnCard from "@/components/Card/BtnCard.vue";
import Eye from "@/components/Eye/auto.vue";
import OU from "@/components/Eye/ou.vue";


import { ref, reactive, shallowRef } from "vue"; 

const ProjectList = {
   Eye: {
     icon: "../../static/Eye/1.png",
     name: "Auto",
     component: Eye,
   },
   OU: {
     icon: "../../static/Eye/2.png",
     name: "OU",
     component: OU,
   },
   Temperature: {
     icon: "../../static/Eye/3.png",
     name: "SINGLE FIELD",
     // component: Temperature,
   },
   Oximeter: {
     icon: "../../static/Eye/4.png",
     name: "IR & VIS",
     // component: Oximeter,
   },
};

const stepComponent = ref("");


const active = ref("");

const handleClickMenu = (item, key) => {
  stepComponent.value = item.component;
  active.value = item.name;
};

const handleClickCard = () => {
  slibrary.$router.go("/pages/health/detection");
};

const changestage = () => {
  active.value = "OU";
  stepComponent.value = OU; // Set to the OU component
  
  
};

const stopbutton = () => {
	slibrary.$router.go("/pages/eye_examination/list");
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
        padding: 10rpx 8rpx;
        color: #fff;
        font-size: 8rpx;
        color: #ffffff;
        line-height: 11rpx;
        margin-bottom: 11rpx;
		width: 80%;

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

.menuimg{
	height: 80px;
	width: 120px;
}

.menuimgbox{
	display: flex;
	flex-direction: column;
	// background: lightgrey;
}

.regular{
	color: white;
	font-size: 10px;
}

</style>