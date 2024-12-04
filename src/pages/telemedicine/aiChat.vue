<template>
  <LayoutContent>
    <view class="pageView">
      <!-- <view class="pageView-title">Past Consultation</view> -->
      <view class="form">
        <uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
			<view class="content-border-box">
			  <view class="contentBox">
				<view class="column">
				  <view class="doctor-card">
				    <div class="leftItems">
				      <image :src="'data:image/jpeg;base64,' + doctorDetails.image" class="doctor-image" />
				      <view class="doctor-info">
				        <div class="doc-details">
				          <view class="doctor-name">{{ doctorDetails.name }}</view>
				          <view class="doctor-specialization">{{ doctorDetails.specialization }}</view>
				        </div>       
				      </view>
				    </div>
				    <button class='recordBtn' @click = "handleClickHome()">FINISH</button>
				  </view>
				 <view class="divider"></view>
				</view>
				<view class="chatContainer" ref="chatContainer">
					<view
					  v-for="(message, index) in chatMessages.slice(0,2)"
					  :key="index"
					  class="chat-bubble"
					>	
					  {{ message }}
					</view>
					<view class="column">
					  <view class="action-button" @click = "runReschedule()">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">Reschedule My Appointment</text>
						</view>
					</view>
					<view class="column">
					  <view class="action-button">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">View Doctor's Schedule</text>
						</view>
					</view>
					<view v-if="rescheduleClick"
					  v-for="(message, index) in chatMessages.slice(2,3)"
					  :key="index"
					  class="chat-bubble reply-bubble"
					>	
					  {{ message }}
					</view>
					
					<view v-if="rescheduleClick"
					  v-for="(message, index) in chatMessages.slice(3,5)"
					  :key="index"
					  class="chat-bubble"
					>
					  {{ message }}
					</view>
					
					<view class="column" v-if="rescheduleClick" @click = "showDateFun()">
					  <view class="action-button">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">View Doctor's Schedule</text>
						</view>
					</view>
					
					<view class="column" v-if="showDates" @click = "selectDate()">
					  <view class="action-button">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">Dec 7</text>
						</view>
						<view class="action-button dec8">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">Dec 8</text>
						</view>
					</view>
					
					<view v-if="hoho"
					  v-for="(message, index) in chatMessages.slice(5,6)"
					  :key="index"
					  class="chat-bubble reply-bubble"
					>
					  {{ message }}
					</view>
					
					<view v-if="hoho"
					  v-for="(message, index) in chatMessages.slice(6,7)"
					  :key="index"
					  class="chat-bubble"
					>
					  {{ message }}
					</view>
					
					<view class="column" v-if="hoho" @click = "timu()">
					  <view class="action-button">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">11 Am</text>
						</view>
						<view class="action-button dec8">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text"> 1 PM</text>
						</view>
						<view class="action-button dec8">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text">5 PM</text>
						</view>
					</view>
					
					<view v-if="completo"
					  v-for="(message, index) in chatMessages.slice(7,8)"
					  :key="index"
					  class="chat-bubble reply-bubble"
					>
					  {{ message }}
					</view>
					
					<view v-if="completo"
					  v-for="(message, index) in chatMessages.slice(8,9)"
					  :key="index"
					  class="chat-bubble"
					>
					  {{ message }}
					</view>
					
					<view class="column" v-if="completo" @click = "choic()">
						<view class="action-button dec8">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text"> YES </text>
						</view>
						<view class="action-button dec8">
						  <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
						  <text class="button-text"> NO </text>
						</view>
					</view>
					
					<view v-if="fullchoice"
					  v-for="(message, index) in chatMessages.slice(9,10)"
					  :key="index"
					  class="chat-bubble reply-bubble"
					>
					  {{ message }}
					</view>
					
					<view v-if="fullchoice"
					  v-for="(message, index) in chatMessages.slice(10,11)"
					  :key="index"
					  class="chat-bubble"
					>
					  {{ message }}
					</view>
					
					
				</view>
				<view class="divider"></view>
					<view class="speech-button">	
					    <image class="icon" src="@/static/mic.png" alt="Microphone Icon" />
					    <text class="button-text">SPEECH TO CHAT</text>
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
import { ref, reactive, onMounted } from "vue";
import { watch } from "vue";

const rescheduleClick = ref(false);
const showDates = ref(false);
const hoho = ref(false);
const completo = ref(false);
const fullchoice = ref(false);

// State for user and doctor details
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

// Reactive chat messages array
const chatMessages = ref([
  "Good Morning! I am Doctor Richardson's bot assistant.",
  "What can I help you today?",
  "Reschedule My Appointment",
  "Select your new Appointment Date",
  "Here are some recommendations for this week",
  "Dec 8",
  "Pick a Time Slot",
  "11 AM",
  "Do you want to change you date to Dec 8 11 AM ?",
  "YES",
  "Thank You! Date successfully Changed to DEC 8 / 11 AM"
]);	



// Populate doctor details from the route on load
onLoad((options) => {
  console.log("Routed Data:", options);

  doctorDetails.name = decodeURIComponent(options.name || "Unknown");
  doctorDetails.specialization = decodeURIComponent(options.specialization || "Unknown");
  doctorDetails.date = decodeURIComponent(options.date || "No date provided");
  doctorDetails.time = decodeURIComponent(options.time || "No time");
  doctorDetails.year = decodeURIComponent(options.year || "2024");
  doctorDetails.image = decodeURIComponent(options.image || "/static/doctordemo.png");
});

// Navigate to the home page
const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/current");
};

// Function to add messages dynamically
const addMessage = (newMessage) => {
  chatMessages.value.push(newMessage);
  scrollToBottom();	
};


const runReschedule = () => {
	rescheduleClick.value = true;
}

const showDateFun = () => {
	showDates.value = true;
}

const selectDate = () => {
	hoho.value = true;
}

const timu = () => {
	completo.value = true;
}

const choic = () => {
	fullchoice.value = true;
}
// Scroll to the bottom of the chat container
const scrollToBottom = () => {
  const chatContainer = document.querySelector(".chatContainer");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

watch(rescheduleClick, (newVal) => {
  if (newVal) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

watch(showDates, (newVal) => {
  if (newVal) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

watch(hoho, (newVal) => {
  if (newVal) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

watch(completo, (newVal) => {
  if (newVal) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

watch(fullchoice, (newVal) => {
  if (newVal) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});
// Add dynamic messages every 3 seconds
// onMounted(() => {
//   setInterval(() => {
//     addMessage("This is a new message added to the chat!");
//   }, 7000);
// });	
</script>

<style lang="scss" scoped>
.pageView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pageView-title{
    font-family: FB;
    color: #fff;
    font-size: 20px;
	// margin-top: 25px;
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
	padding-right: 20px;
	padding-left: 20px;
	padding-top: 20px;
	padding-bottom: 10px;
}

.image-responsive {
  max-width: 50px;
  max-height: 50px;
}
.uni-title{
	color: #58FFCF;
	margin-bottom: 15px;
	margin-top: 15px;
}

.back{
	margin-top: 10px;
}


.prescription-name {
  font-weight: bold; /* Make the medicine name bold */
  font-size: 14px; /* Increase font size */
  margin-bottom: 4px; /* Add spacing below the name */
}

.prescription-details {
  font-size: 12px; /* Standard font size for details */
  line-height: 1.5; /* Improve readability with line height */
  color: #a0a0a0; /* Slightly lighter color for details */
}

.textarea-grey-border {
	color: white;
	border: 2px solid grey;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 20px;
	background-color: transparent;
	width: 100%;
	font-size: 14px;
}
.image-text{
	color: white;
}
.form {
  width: 80%;
}

.doctor-card {
          width: 100%;
		  margin-bottom: 15px;
          // height: 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // background: #232a31;
          border-radius: 16px;
          text-align: center;
          // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		  .leftItems {
		    display: flex; /* Arrange items horizontally */
		    align-items: center; /* Align items vertically */
		    gap: 15px; /* Add space between the image and the details */
		  }

          .doctor-image {
            width: 45px;
            height: 45px;
            border-radius: 20%;
            object-fit: cover;
          }

          .doc-details {
            display: flex;
            flex-direction: column;
            text-overflow: ellipsis;
          }

          .doctor-info {
            display: flex;
            min-width: 3rem;
			margin-left: 0.4rem;
            color: #fff;
            gap: 8rpx;

            .doctor-name {
              max-width: 3rem;
              font-weight: bold;
              margin-bottom: 4px;
			  display:flex;
			  font-size: 0.3rem;
			  text-align: left;
			  margin-bottom: 4px;
            }

            .doctor-specialization {
              color: #a0a0a0;
              margin-bottom: 4px;
			  text-align: left;
			  font-size: 0.23rem;
            }
			
		}
}
.recordBtn {
  margin: white;
  background-color: red;
  padding-left: 7px;
  padding-right: 7px;
  font-size: 14px; /* Adjust font size here */
  color: white; /* Optional: Ensure text color is visible */
  border-radius: 10px; /* Optional: Add rounded corners */
  cursor: pointer; /* Optional: Show pointer cursor on hover */
  margin: inherit;
}

.divider {
	width: 100vw; /* Full viewport width */
	height: 1px;
	background-color: #ccc; /* Light grey color */
	margin-left: -40px;
	margin-right: -40px;
}

.chatContainer {
  height: 300px; /* Set a fixed height */
  overflow: hidden; /* Hide content outside the container */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between chat bubbles */
  // border: 1px solid rgba(0, 0, 0, 0.2); /* Optional: Add a border */
  border-radius: 10px;
  background-color: transparent; /* Match theme */
  padding: 10px;
}

.chat-bubble {
	display: inline-flex;
	background-color: rgba(255, 255, 255, 0.1);
	color: white;
	padding: 10px 15px;
	border-radius: 20px;
	font-size: 14px;
	max-width: 50%;
	opacity: 0; /* Initially hidden */
	align-self: flex-start;
	transform: translateX(-100%); /* Start off-screen to the left */
	animation: slideInFromLeft 1s ease-out 1s forwards; /* Slide in animation */
}

.reply-bubble {
  display: inline-flex;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  max-width: 50%;
  align-self: flex-end; /* Aligns the bubble to the right */
  opacity: 0; /* Initially hidden */
  transform: translateX(100%); /* Start off-screen to the right */
  animation: slideInFromRight 0.5s ease-out forwards; /* Slide in animation */
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(100%); /* Off-screen to the right */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* Final position */
  }
}



.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #1e1e2e;
  border: 2px solid #00d1ff;
  border-radius: 12px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  opacity: 0; /* Initially hidden */
  transform: translateX(-100%); /* Start off-screen to the left */
  animation: slideInFromLeft 1s ease-out 2s forwards; /* Slide in animation */
}



/* Keyframes for sliding in from the left */
@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%); /* Off-screen */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* Final position */
  }
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Shadow on hover */
}
.speech-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  background: linear-gradient(90deg, #00d1ff, #00ffa3); /* Gradient background */
  border: none;
  border-radius: 30px; /* Rounded button */
  color: black; /* Text color */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); /* Shadow effect */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: fit-content; /* Adjust width to content */
  height: fit-content; /* Adjust height to content */
  margin-top: 10px;
}

.speech-button:hover {
  transform: scale(1.05); /* Slight zoom effect on hover */
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px; /* Space between icon and text */
}

.button-text {
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.speech-button .button-text{
	color: black;
}

.dec8{
	margin-left: 10px;
}



</style>