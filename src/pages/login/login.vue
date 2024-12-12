<template>
  <LayoutContent showBack @back="handleClickBack">
    <!-- Login Options -->
    <view class="login" v-if="state.setp == 1">
      <view class="login-title">Select Login Option</view>
      <view class="login-select-box">
        <view class="login-select-box-card" @click="handleClickCard">
          <BtnCard>
            <view class="icon">
              <image src="@/static/login/Vector.png" mode="heightFix"></image>
            </view>
            <view class="text">MOBILE<br />NUMBER</view>
          </BtnCard>
        </view>
        <view class="login-select-box-card" @click="handleClickCard">
          <BtnCard>
            <view class="icon">
              <image src="@/static/login/Vector1.png" mode="heightFix"></image>
            </view>
            <view class="text">HEALTH<br />CARD</view>
          </BtnCard>
        </view>
        <view class="login-select-box-card" @click="handleClickCard">
          <BtnCard>
            <view class="icon">
              <image src="@/static/login/Vector3.png" mode="heightFix"></image>
            </view>
            <view class="text">UNIQUE<br />CODE</view>
          </BtnCard>
        </view>
      </view>
    </view>

    <!-- Phone Number Login -->
    <view class="login" v-else-if="state.setp == 2">
      <view class="login-title">Login with <i>Phone Number</i></view>
      <view class="loginInputBox">
        <view class="inputBox">
          <view class="label">Phone Number*</view>
          <view class="inputBox">
            <view class="qianzhui">+86</view>
            <view class="input">
              <input type="text" v-model="phoneNumber" />
            </view>
          </view>
        </view>
        <BasicButton @click="handleClickLogin" :disabled="loading">
          {{ loading ? "Submitting..." : "SUBMIT" }}
        </BasicButton>
      </view>
    </view>

    <!-- Pin Verification -->
    <view class="login" v-else-if="state.setp == 3">
      <view class="login-title">Input <i>Pin Verification</i></view>
      <view class="pinBox">
        <CodeInput :digitboxcount="6"></CodeInput>
        <view class="pinBtn">
          <BasicButton @click="handleClickLoginCreate">CREATE</BasicButton>
        </view>
      </view>
    </view>

    <!-- Modal for Wrong Credentials -->
    <view v-if="showModal" class="modal-overlay">
      <view class="modal">
        <view class="modal-header">Invalid Login</view>
        <view class="modal-body">
          The phone number or credentials entered are incorrect. Please try again.
        </view>
        <view class="modal-footer">
          <button class="modal-btn close" @click="closeModal">Close</button>
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
const showModal = ref(false);

const handleClickBack = () => {
  if (state.setp != 1) {
    state.setp = state.setp - 1;
  }
};

const handleClickCard = () => {
  state.setp = 2;
};

const handleClickLogin = async () => {
  if (!phoneNumber.value) {
    console.log("Please enter a phone number.");
    return;
  }

  loading.value = true;

  try {
    console.log('Sending API request...');
    const response = await sendLoginRequest(phoneNumber.value); // Check if this request is being sent correctly
    console.log('API response:', response);
	
    if (response) {
      state.setp = 3;  // Move to next step
    } else {
      console.log("Login failed: No valid data.");
	  showModal.value = true;
    }
  } catch (error) {
    console.error("Error during login:", error);
	showModal.value = true;
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  showModal.value = false; // Close the modal
};

const handleClickRegister = () => {
  slibrary.$router.go("/pages/login/login");
};

const handleClickLoginCreate = () => {
  slibrary.$router.go("/pages/health/index");
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pinBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .pinBtn {
        margin-top: 50rpx;
        width: 436rpx;
        display: flex;
        justify-content: center;
    }
  }
  .loginInputBox {
    width: 435.94rpx;

    .inputBox {
      width: 100%;
      .label {
        font-family: FM;
        font-size: 9.38rpx;
        margin-bottom: 8rpx;
        color: #06ffb8;
      }

      .inputBox {
        width: 100%;
        border-radius: 2rpx 2rpx 2rpx 2rpx;
        border: 1rpx solid #d8d8d8;
        display: flex;
        align-items: center;
        padding: 8rpx 12rpx;
        margin-bottom: 32rpx;

        .qianzhui {
          margin-right: 10rpx;
          font-size: 12rpx;
          color: #ffffff;
        }
        .input {
          width: 100%;
          input {
            width: 100%;
            background: transparent;
            font-size: 12rpx;
            color: #ffffff;
          }
        }
      }
    }
  }
  &-title {
    font-family: FB;
    color: #fff;
    font-size: 20px;
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
      margin-right: 29rpx;

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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.modal-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.modal-body {
  font-size: 14px;
  margin-bottom: 20px;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
}
.modal-btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.modal-btn.close {
  background-color: #f44336;
  color: #fff;
}
</style>
