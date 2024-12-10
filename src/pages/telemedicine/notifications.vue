<template>
  <LayoutContent showBack @back="handleClickHome">
    <view class="pageView">
      <view class="form">
        <uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
          <view class="pageView-title">Notifications</view>
          <view class="notificationContainer">
            <view class="allNotifications notibox">
              <view class="<strong>notibox-title</strong> topic">All Notifications</view>
              <view v-if="notifications.length > 0">
                <view v-for="(notification, index) in notifications" :key="index">
                  <!-- Conditional Rendering Based on Notification Source -->
                  <view v-if="notification.source === 'cancel'" class="content-border-box cancelNotification">
                    <view class="contentBox">
						<view class="currenttime">
							 {{ currentDateTime }}
						</view>
						<h4>Your appointment has been cancelled</h4>
                        <!-- Greeting and Notification Message -->
						
                        <view class="notification-message">
                          Hi Debra! Your appointment at {{ notification.date }} {{ notification.year }} at {{ notification.time }} with {{ notification.name }} has been cancelled.
                        </view>
                    </view>
                  </view>

                  <view v-else-if="notification.source === 'update'" class="content-border-box updateNotification">
                    <view class="contentBox">
                    	<view class="currenttime">
                    		 {{ currentDateTime }}
                    	</view>
                    	<h4>Your appointment has been updated.</h4>
                        <!-- Greeting and Notification Message -->
                    	
                        <view class="notification-message">
                          Hi Debra! You old appointment with {{ notification.name }} at {{ notification.olddate }} {{ notification.oldyear }}/ {{ notification.time }} has been successfully changed to {{ notification.date }} {{ notification.year }} / {{ notification.time }}.
                        </view>
                    </view>
                  </view>

                  <view v-else class="content-border-box completeNotification">
                    <view class="contentBox">
                    	<view class="currenttime">
                    		 {{ currentDateTime }}
                    	</view>
                    	<h4>An appointment has been made.</h4>
                        <!-- Greeting and Notification Message -->
                    	
                        <view class="notification-message">
                          Hi Debra! An appointment with {{ notification.name }} at {{ notification.date }} {{ notification.year }} at {{ notification.time }} has been made.
                        </view>
                    </view>
                  </view>
                </view>
              </view>
              <view v-else>
                <view class="content-border-box">
                  <view class="contentBox">
                    <p>No notifications available.</p>
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

const currentDateTime = ref('');



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
  }
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
const updateCurrentDateTime = () => {
  const now = new Date();
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  currentDateTime.value = `${date}/${month}/${year} at ${formattedHours}:${minutes} ${ampm}`;
};
onMounted(() => {
  updateCurrentDateTime(); // Set initial value
});

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/choicePage");
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
	background: linear-gradient(181deg, rgb(44,56,65) 0%, rgb(34, 45, 52) 100%);
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

h4{
	color: white;
	margin-bottom: 10px;
	margin-top: 10px;
	font_size:20px;
}

.notification-message{
	color: white;
	font-size: 14px;
}

.currenttime {
  font-size: 12px;         
  color: rgba(255, 255, 255, 0.6); 
}

.topic{
	color: #59FFCF;
	font-size: 15px;
	font-weight: bold;
}

</style>
