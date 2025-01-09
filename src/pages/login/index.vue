<template>
  <LayoutContent>
    <view class="login">
      <view class="logo">
        <image src="@/static/logo3.png"></image>
      </view>
      <view class="btns">
        <view class="btn1">
          <BasicButton @click="handleClickLogin">
            LOGIN PATIENT ACCOUNT
          </BasicButton>
        </view>
        <view>
          <BasicButton borderBtn @click="handleClickRegister">
            NO ACCOUNT? <i class="register">REGISTER</i>
          </BasicButton>
        </view>
      </view>
    </view>
  </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/logincontent.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import { ref } from "vue";
// import { sendCode } from "@/services/api/auth";

const form = ref({
  email: "",
});

const loading = ref(false);

const handleClickLogin = () => {
  slibrary.$router.go("/pages/login/login");
};

const handleClickRegister = () => {
  slibrary.$router.go("/pages/registeration/index");
};

const handleTapVerify = async () => {
  loading.value = true;

  setTimeout(() => {
    slibrary.$helper.toast("Successfully sent！");
    setTimeout(() => {
      loading.value = false;
      slibrary.$router.go("/pages/login/pin");
    }, 1500);
  }, 1000);
  // try {
  // 	const res = await sendCode({
  // 		email: form.value.email
  // 	})
  // 	slibrary.$helper.toast('Successfully sent！')
  // 	setTimeout(() => {
  // 		loading.value = false
  // 		slibrary.$router.go('/pages/login/pin')
  // 	}, 1500)
  // }catch(err) {
  // }
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

  .logo {
    width: 400px;
    height: 100px;
    margin-bottom: 40px;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    width: 200rpx;
    .btn1 {
      margin-bottom: 20px;
    }

    .register {
      color: #12ffbb;
    }
  }
}
</style>