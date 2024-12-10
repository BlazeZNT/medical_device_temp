<template>
  <LayoutContent showBack @back="handleClickHome">
    <view class="pageView">
      <!-- <view class="pageView-title">Past Consultation</view> -->
      <view class="form">
        <uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
			<view class="pageView-title">Notifications</view>
			<view class= "notificationContainer">
				<!-- <view class="today notibox">
					<view class="notibox-title">Today</view>
					<view class="content-border-box">
					  <view class="contentBox"> 
					  </view>
					</view>
				</view> -->
				<view class="allNotifications notibox">	
					<view class="notibox-title">All Notifications</view>
					<view class="content-border-box">
					  <view class="contentBox">
						    <view class="notification-page">
						      <view v-if="notifications.length > 0">
						        <h3>Notifications</h3>
						        <ul>
						          <li v-for="(notification, index) in notifications" :key="index">
						            <p>{{ notification.message }}</p>
						          </li>
						        </ul>
						      </view>
						      <view v-else>
						        <p>No notifications available.</p>
						      </view>
						    </view>
					  </view>
					</view>
				</view>
			</view>
        </uni-forms>
      </view>
    </view>
  </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import { ref, reactive } from "vue";
import { getAppointments, cancelAppointment } from "@/utils/auth.ts"; // Import the API function
import { useAppStore } from '@/stores/app'; // Import the store

// Access the notifications from the store
const appStore = useAppStore();
const notifications = appStore.allNotifications; // Use the getter


const doctors = ref([]);
const pages = ref([]);
const currentDoc = 0;

const state = reactive({
  step: 1,
  userInfo: {
    date: "",
    time: "",
    year: "2024",
  },
  diagnosis: "Influenza (Flu) The viruses that cause flu spread at high levels during certain times of the year in the Northern and Southern hemispheres. These are called flu seasons. During times when flu is widespread, you may not need a flu test.",
  suggestions: "Take a rest. Get discipline with taking medicine on prescription.",
});

const doctorDetails = reactive({
  name: "",
  specialization: "",
  date: "",
  time: "",
  year: "",
  image: "",
});

onLoad((options) => {
  console.log("Routed Data:", options);

  // Populate the reactive doctorDetails object
  doctorDetails.name = decodeURIComponent(options.name || "Unknown");
  doctorDetails.specialization = decodeURIComponent(options.specialization || "Unknown");
  doctorDetails.date = decodeURIComponent(options.date || "No date provided");
  doctorDetails.time = decodeURIComponent(options.time || "No time");
  doctorDetails.year = decodeURIComponent(options.year || "2024");
  doctorDetails.image = decodeURIComponent(options.image || '/static/doctordemo.png');

  // console.log("Parsed Doctor Details:", doctorDetails);
  
});

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/consultHistory");
};
</script>

<style lang="scss" scoped>
.pageView {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pageView-title{
    font-family: FB;
    color: #fff;
    font-size: 20px;
	margin-bottom: 40px;
	margin-top: 25px;	
	text-align: center;
	
}
.content-border-box{
    padding: 1px;
    width: 100%;
    align-self: center;
    height: 100%;
    margin-top: 0.2rem;
    overflow: hidden;
    background: linear-gradient(238deg, rgb(88, 255, 207), rgb(27, 48, 42));
    border-radius: 15px;
}
.contentBox{
	background: linear-gradient(181deg, rgb(44,56,65) 0%, rgb(27, 32, 40) 100%);
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px;
}

	
.form{
	width: 70%;
}
.notibox{
	.notibox-title{
		font-family: FB;
		color: seagreen;
		font-size: 15px;
		
	}

}
.today{
	
}
.allNotifications{
	margin-top: 50px;
	
}
.notification-page {
  padding: 16px;
  background-color: #f8f9fa;
}

</style>
