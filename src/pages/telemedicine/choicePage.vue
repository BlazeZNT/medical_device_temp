<template>
  <LayoutContent showBack @back="handleClickBack" >
    <view class="login" v-if="state.setp == 1">
      <view class="login-title">My Appointments</view>
      <view class="login-select-box">
        <view class="login-select-box-card" @click="handleClickCard(1)">
          <BtnCard class ="live">
            <view class="icon">
              <image src="@/static/login/Vector.png" mode="heightFix"></image>
            </view>
            <view class="text"> CONSULT<br />NOW </view>
          </BtnCard>
        </view>
        <view class="login-select-box-card" @click="handleClickCard(2)">
          <BtnCard>
            <view class="icon">
              <image src="@/static/login/Vector1.png" mode="heightFix"></image>
            </view>
            <view class="text">
              MY<br />APPOINTMENTS
              &nbsp;
            </view>
          </BtnCard>
        </view>
		<view class="login-select-box-card" @click="handleClickCard(3)">
		  <BtnCard>
		    <view class="icon">
		      <image src="@/static/login/Frame.png" mode="heightFix"></image>
		    </view>
		    <view class="text">
		      CONSULTATION<br />HISTORY
		      &nbsp;
		    </view>
		  </BtnCard>
		</view>
      </view>
    </view>
  </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import BtnCard from "@/components/Card/BtnCard.vue";
import slibrary from "@/slibrary/index.js";
import CodeInput from "@/components/CodeInput/index.vue";
import BasicButton from "@/components/BasicButton/index.vue";
import { ref, reactive } from "vue";
import {sendLoginRequest} from "@/utils/auth.ts"; // Import the API function

const state = reactive({
  setp: 1,
});

const phoneNumber = ref("");  // Use this to bind the phone number input
const loading = ref(false);   // This will manage the loading state for the API request

const handleClickBack = () => {
  if (state.setp != 1) {
    state.setp = state.setp - 1;

  }else{
	slibrary.$router.go("/pages/health/index");
  }
};

const handleClickCard = (type) => {
  switch (type) {
    case 1:
      slibrary.$router.go("/pages/telemedicine/videocall");
      break;
    case 2:
      slibrary.$router.go("/pages/telemedicine/doctorvideocall");
      break;
	case 3:
		slibrary.$router.go("/pages/telemedicine/consultHistory");

  }
};



</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
  &-title {
    font-family: FB;
    color: #fff;
    font-size: 30px;
    margin-bottom: 70px;

    i {
      color: #06ffb8;
    }
  }
  &-select-box {
    display: flex;

    &-card {
      width: 167rpx;
      height: 219rpx;
      margin-left: 0.9rem;
	  

      .icon {
        height: 47.74rpx;
        margin-bottom: 47px;
        image {
          height: 100%;
        }
      }
      .text {
        text-align: center;
        font-family: FB;
        font-size: 15rpx;
        color: #5beaff;
      }
	  .live{
		  background-image: linear-gradient(90deg, #06ffb8 0%, #783AB6 100%);
		  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		.text{
			color: white;
		}
	  }
    }
  }
}
:deep() {
  .uni-input-input {
    line-height: 12rpx !important;
  }
  .uni-input-wrapper {
    height: auto;
  }
}

</style>
