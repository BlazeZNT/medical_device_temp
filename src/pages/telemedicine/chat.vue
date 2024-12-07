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
		  <div class="chat-container">
			  <div class="messages">
				  <div v-for="(msg, index) in messages" :key="index">
					  <p>{{ msg.userName }}: {{ msg.message }}</p>
				  </div>
			  </div>
			  <input v-model="newMessage" placeholder="Type a message..." />
			  <button @click="sendMessageToUser">Send</button>
		  </div>
		  <view class="appointment-button-container" >
		    <button v-if = "startVid" class="appointment-button videoEndBtn" @click="call()"><img src="@/static/video.png" alt="Back Icon" class="icon" /></button>
			<button v-else class="appointment-button videoStartBtn" @click="call()"><img src="@/static/no-video.png" alt="Back Icon" class="icon" /></button>
			<button class="appointment-button endCall" ><img src="@/static/telephone.png" alt="Back Icon" class="icon2" /></button>
		  </view>
        </view>
		
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
import ZIM from '@/js_sdk/zego-ZIMUniPlugin-JS/lib/ZIM';

// Replace with your actual AppID
const appID = 807478997; 
const zim = ZIM.create(appID);



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

const startVid = ref(false); 

const call = () => {
  onClickPublish()
  // onClickPlay()
  
  if (startVid.value === false) {
    startVid.value = true;
  } else {
    startVid.value = false;
  }
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

export default {
    data() {
        return {
            zim: null,
            appID: 'Your_AppID', // Replace with your AppID
            token: '', // Replace with your generated token
            userInfo: {
                userID: 'user123', // Unique user ID
                userName: 'JohnDoe' // User's name
            }
        };
    },
    created() {
        this.initializeZIM();
    },
    methods: {
        initializeZIM() {
            this.zim = ZIM.create(this.appID);
            this.zim.on('receivePeerMessage', this.handleIncomingMessage);
        },
        login() {
            this.zim.login(this.userInfo, this.token)
                .then(() => {
                    console.log('Login successful');
                })
                .catch((err) => {
                    console.error('Login failed', err);
                });
        },
        handleIncomingMessage(zim, { messageList, fromConversationID }) {
            console.log('Received messages:', messageList, fromConversationID);
        }
    }
};

sendMessage(toUserID, messageContent) {
    const message = {
        type: 1, // Text message
        message: messageContent
    };
    const config = { priority: 1 }; // Low priority

    this.zim.sendPeerMessage(message, toUserID, config)
        .then(({ message }) => {
            console.log('Message sent successfully', message);
        })
        .catch((err) => {
            console.error('Failed to send message', err);
        });
}
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
		right: 226px;
		width: 200px;
		height: 200px;
		z-index: 999;
		top: 70;
      }
	  .consultation-details {
	          margin-top: 20px;
	          text-align: center;
	          color: #ffffff;
		}
    }
	.appointment-button-container {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-top: 15px;
		margin-bottom: 15px;
		align-items: center;
		text-align: center;
	
		button {
			width: auto; // Adjust width to fit content or customize as needed
			margin: 0; // Remove margins to ensure even spacing
		}
	}
	
	.videoStartBtn {
	  display: flex;
	  align-items: center; /* Align image and text */
	  gap: 8px; /* Space between the image and text */
	  background-color: red;
	}
	
	.videoEndBtn{
		display: flex;
		align-items: center; /* Align image and text */
		gap: 8px; /* Space between the image and text */
		background-color: royalblue;
	}
	
	.endCall{
		display: flex;
		align-items: center; /* Align image and text */
		gap: 8px; /* Space between the image and text */
		background-color: royalblue;
		padding-top: 2.5px;
		padding-bottom: 2.5px;
		border-radius: 100px;
		background-color: red;
	}
	
	.icon {
	  width: 40px; /* Adjust the size of the image */
	  height: 40px;
	}
	.icon2 {
	  width: 35px; /* Adjust the size of the image */
	  height: 35px;
	}

    .content-border-box {
      width: 80%;
      align-self: center;
      height: 550px;
      margin-top: 0.2rem;
      overflow: hidden;
      background: linear-gradient(238deg, rgba(88, 255, 207, 1), rgba(27, 48, 42, 1));
      border-radius: 24px;
      // padding: 20px;

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
