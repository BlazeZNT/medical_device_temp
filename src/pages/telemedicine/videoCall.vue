<template>
  <view class="page">
    <Header />


    <view class="content">
		<view class="doctor">
			<view class="consultation-details">
			<text class="doctor-name">Consultation with {{ doctors[0].name }}</text>
		</view>
      <view class="content-border-box">
        <view class="leftback">
          <image src="@/static/back.png" class="image-link" @click="handleItemClick(1)"></image>
        </view>
		
		

        <view class="doctor">
          <view class="self">
            <!-- #ifdef APP-PLUS -->
            <zego-local-view class="video-view"></zego-local-view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <video
                id="local_video"
                class="video-view"
                autoplay
                playsinline
                crossorigin="anonymous"
            ></video>
            <!-- #endif -->
          </view>
          <!-- #ifdef APP-PLUS -->
          <zego-remote-view
              class="video-view"
              v-if="engine"
              :streamID="playStreamID"
          >
          </zego-remote-view>
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <video
              id="remote_video"
              class="video-view"
              autoplay
              playsinline
              crossorigin="anonymous"
              :muted="playVideoMuted"
          ></video>
          <!-- #endif -->
        </view>
      </view>
	  <view class="appointment-button-container" >
	    <button class="appointment-button" @click="call()">Call the doctor</button>
	  </view>
    </view>
	</view>
  </view>
</template>

<script setup>
import Header from "@/components/Layout/Header.vue";
import slibrary from "@/slibrary/index.js";
import {useZego} from "@/composables/useZego";
import {usePublish} from "@/composables/usePublish";
import {usePlay} from "@/composables/usePlay";

// Initialize the doctors array
const doctors = ref([
  { image: "/static/doctordemo.png", name: "Dr. Robert Lee", specialization: "Dermatologist", date: "7 December ", year: "2024",time: "10:00am", status: "upcoming" },
  { image: "/static/doctor2.png", name: "Dr. Richardson Jones", specialization: "Surgeon", date: "7 December ", year: "2024",time: "10:00am", status: "past" },
  { image: "/static/doctor3.png", name: "Dr. Prasnan Meni", specialization: "Family Medicine", date: "7 December ", year: "2024",time: "10:00am", status: "upcoming" },
  { image: "/static/doctor4.png", name: "Dr. Dhanang Prast", specialization: "Neurologist", date: "7 December ", year: "2024",time: "10:00am", status: "past" },
  // { image: "/static/doctor5.png", name: "Dr. Adnan Satya", specialization: "Surgeon", date: "7 December ", year: "2024",time: "10:00am", status: "past" },
]);

// Pages for pagination
const pages = ref([]);
const token = ref('');

const {
  info,
  logHeight,
  roomID,
  userName,
  isLogin,
  isRequest,
  engine,
  // 方法
  createEngine,
  destroyEngine,
  loginRoom,
  logoutRoom,
  changeLogViewSize,
  appendActionInfo,
  appendSuccessInfo,
  appendFailureInfo,
  appendCallbackInfo
}  = useZego()
const {
  publishStreamID,
  publishBtnName,
  isPublishingStream,
  localVideoElem,
  pubVideoMuted,
  startPublishingStream,
  stopPublishingStream,
  startPreview,
  stopPreview,
  onClickPublish,
  addPublishListeners,
} = usePublish({
  engine,
  appendActionInfo,
  appendCallbackInfo,
  appendSuccessInfo
})

const {
  playStreamID,
  playVideoElem,
  isPlayingStream,
  playBtnName,
  playVideoMuted,
  playStream,
  onClickPlay,
  startPlayingStream,
  stopPlayingStream,
  addPlayListeners,
  playError
} = usePlay({
  engine,
  appendActionInfo,
  appendCallbackInfo,
  appendSuccessInfo
})

watch(
  doctors,
  (newValue) => {
    console.log(`Doctors Array Updated. Total items: ${newValue.length}`);
  },
  { deep: true }
);

const call = () => {
  onClickPublish()
  // onClickPlay()
}

const addListeners = () => {
  engine.value.on("apiCalledResult", (errorCode, funcName, info) => {
    if (errorCode == 0) {
      appendSuccessInfo(`[${funcName}]: ${info}`);
    } else {
      appendFailureInfo(
          `[${errorCode}][${funcName}]: ${info}`
      );
    }
  });
  engine.value.on("roomStateChanged", (roomID, reason, errorCode, extendedData) => {
    console.log(`roomStateChanged. roomID: ${roomID}, ${reason}, ${errorCode}`);
  });

  engine.value.on('roomStreamUpdate', (roomID, updateType, streamList) => {
    // 用户状态更新，登录房间后，当房间内有用户新增或删除时，SDK会通过该回调通知
    console.log('roomStreamUpdate',roomID, updateType, streamList)
    playStreamID.value = streamList[0].streamID
    onClickPlay()
  });

  addPublishListeners();
  addPlayListeners();
}
onMounted(async () => {
  // #ifdef APP-PLUS
  if (uni.getSystemInfoSync().platform === "android") {
    await permision.requestAndroidPermission(
        "android.permission.RECORD_AUDIO"
    );
    await permision.requestAndroidPermission(
        "android.permission.CAMERA"
    );
  }
  // #endif
  // #ifdef H5
  localVideoElem.value = document.querySelector("#local_video video");
  playVideoElem.value = document.querySelector("#remote_video video");
  console.log(12312312,localVideoElem.value)
  // #endif
})
// On page load, add incoming data to the doctors array
onLoad(async (options) => {

  // Create a new doctor object from incoming data
  let userId = options.userId || 'uniapp';
  let userName = options.userName || 'Debra Robertson';
  uni.request({
    url: "/api/loginByVideo?userId=" + userId,
    success: async (res) => {
      token.value = res.data
      await createEngine();
      addListeners();
      loginRoom("R00001", userId, userName, res.data)
    }
  })

  const incomingDoctor = {
    status: "upcoming", // Default status
  };

  // Add the incoming doctor to the doctors array
  if (incomingDoctor.name !== "Unknown") {
    console.log("its is ")
    doctors.value.push(incomingDoctor);
  }

  // Recalculate pages for pagination
  const itemsPerPage = 3;
  pages.value = [];
  for (let i = 0; i < doctors.value.length; i += itemsPerPage) {
    pages.value.push(doctors.value.slice(i, i + itemsPerPage));
  }

  console.log("Updated Doctors Array:", doctors.value);
  console.log("Updated Pages Array:", pages.value);
});

// Handle navigation based on the button type
const handleItemClick = (type) => {
  switch (type) {
    case 1:
      slibrary.$router.go("/pages/health/index");
      break;
    case 2:
      slibrary.$router.go("/pages/telemedicine/appointmentList");
      break;
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-image: url("@/static/bgImage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #1f252c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.9rem;
    padding-top: 0;


    .doctor {
      display: flex;
	  flex-direction: column;
      width: 100%;
      height: 100%;

      .self {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 200px;
        height: 200px;
        z-index: 999;
      }
	  .consultation-details {
	          margin-top: 20px;
	          text-align: center;
	          color: #ffffff;
		}
    }
	.appointment-button-container{
		width: 80%;
		margin-top: 12px;
		align-self: center;
		text-align: center;
		button{
			width: 70%
		}
	}

    .content-border-box {
      width: 80%;
      align-self: center;
      height: 100%;
      margin-top: 0.2rem;
      overflow: hidden;
      background: linear-gradient(238deg, rgba(88, 255, 207, 1), rgba(27, 48, 42, 1));
      border-radius: 24px;
      padding: 20px;

      .leftback,
      .rightback {
        position: absolute;
        z-index: 2;
        width: 50px;
        height: 50px;

        image {
          width: 100%;
          height: 100%;
        }
      }
      .video-view {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
