<template>
  <LayoutContent>
	  <view class="messageBox">
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
<!-- 		<view class="uni-title uni-common-mt">
			Vertical Scroll
			<text>\n纵向滚动</text>
		</view>
		<view @tap="goTop" class="uni-link uni-center uni-common-mt">
			点击这里返回顶部
		</view> -->
<!-- 		<view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				@scrolltolower="lower" @scroll="scroll">
				<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
				
				<view class="flex-wrapper">
				  <view
					v-for="(message, index) in chatMessages"
					:key="index"
					:class="[message.className || 'chat-bubble']"
				  >
					<template class="scroll-view-item" v-if="message.type === 'text'">
					  {{ message.content }}
					</template>
				 </view>
				</view>
				<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
			</scroll-view>
		</view> -->
		<scroll-view
		  class="chatContainer scroll-Y"
		  scroll-y
		  :scroll-top="scrollTop"
		  ref="chatContainer"
		  @scroll="scroll"
		>
			<view class="flex-wrapper">
			  <view
				v-for="(message, index) in chatMessages"
				:key="index"
				:class="[message.className || 'chat-bubble']"
			  >
				<template class="scroll-view-item" v-if="message.type === 'text'">
				  {{ message.content }}
				</template>
				<template v-else-if="message.type === 'calendar'">
				  <CustomCalendar />
				</template>
				<template v-else-if="message.type === 'calendar2'">
				  <CustomCalendar2 @update-date="updateDate"/>
				</template>
				<template v-else-if="message.type === 'button'">
				  <view class="action-button" @click="buttoncase(1)">
					<image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
					<text class="button-text">View Doctor's Schedule</text>
				  </view>
				</template>
				<template v-else-if="message.type === 'rescheduleBtn'">
				  <view class="action-button" @click="buttoncase(2)">
					<image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
					<text class="button-text">Reschedule my appointment</text>
				  </view>
				</template>
				<template v-else-if="message.type === 'datesBtnGroup'">
				  <view class="dates-btn-group">
					<view
					  v-for="(date, index) in message.dates"
					  :key="index"
					  class="action-button"
					  @click="buttoncase(4, date, 'December','Reschedule2')"
					>
					  <text class="button-text">{{ date }}</text>
					</view>
				  </view>
				</template>
				<template v-else-if="message.type === 'another'">
				  <view class="action-button" @click="buttoncase(4, 'Select another Date', '', 'Reschedule5')">
					<image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
					<text class="button-text">Select another Date</text>
				  </view>
				</template>
				<template v-else-if="message.type === 'timesBtnGroup'">
				  <view class="dates-btn-group">
					<view
					  v-for="(time, index) in message.dates"
					  :key="index"
					  class="action-button"
					  @click="buttoncase(6, time)"
					>
					  <text class="button-text">{{ time }}</text>
					</view>
				  </view>
				</template>
				<template v-else-if="message.type === 'yesorno'">
				  <view class="dates-btn-group">
					<view
					  v-for="(option, index) in message.options || []"
					  :key="index"
					  class="action-button"
					  @click="buttoncase(8, option, message.item)"
					>
					  <text class="button-text">{{ option }}</text>
					</view>
				  </view>
				</template>
			  </view>
			</view>
			
		</scroll-view>
		
		<!-- <view class="divider"></view>
			<view class="speech-button">	
				<image class="icon" src="@/static/mic.png" alt="Microphone Icon" />
				<text class="button-text">SPEECH TO CHAT</text>
			 </view> -->
	  </view>
	  <!-- Popup Modal -->
	      <div v-if="showPopup" class="popup">
	        <div class="popup-content">
	          <p>Connecting... to your appointments</p>
	        </div>
	      </div>
					  
 </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import { ref, reactive, onMounted, nextTick } from "vue";
import { watch } from "vue";
import { createAppointment, updateAppointment } from "@/utils/auth.ts"; 
import CustomCalendar from "@/components/customCalendar2/index.vue";
import CustomCalendar2 from "@/components/customCalendar/index.vue";


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
  },
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
const chatMessages = ref([]);
const date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const month = [
  "Janurary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguse",
  "September",
  "October",
  "November",
  "December",
];
const time = ["10:30","11:30","12:30","14:30","15:30","16:30","17:30","17:00","19:00"]
const replies = ref([
  {
    greeting: "Good Morning! I am { doctorDetails.name }'s bot assistant. How can I help you today?",
  },
]);
const input = ref([]);
const showPopup = ref(false);

// Populate doctor details from the route on load
onLoad((options) => {
  // console.log("Routed Data:", options);
  doctorDetails.id = decodeURIComponent(options.id || "Unknown");
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



// Scroll to the bottom of the chat container

const addMessage = (newMessage) => {
  setTimeout(() => {
    chatMessages.value.push(newMessage);
  }, 1000);
};


onMounted(() => {
	buttoncase(10);
});

// Reactive state
const scrollTop = ref(0);
const oldScrollTop = ref(0);


const scroll = (e) => {
  oldScrollTop.value = e.detail.scrollTop; // Update old scroll position
};

const goTop = () => {
  // Resolve view synchronization issues
  scrollTop.value = oldScrollTop.value;
  nextTick(() => {
    scrollTop.value = 9999; // Reset scroll position to top
  });
};

watch(chatMessages, () => {
  console.log("New message added, lastMessageId:");
  goTop();
}, { deep: true });



const rescheduleDate = async () => {
		try{
			
			const request = {  
				id: doctorDetails.id,
				imageBase64: doctorDetails.image,
				name: doctorDetails.name,
				specialization: doctorDetails.specialization,
				year: state.userInfo.year,
				date: state.userInfo.date,
				time: state.userInfo.time
			};
			// console.log('Request:', request);
			
			const response = await updateAppointment(doctorDetails.id, request);
			if(response){
				console.log(response);
			}
		}catch(e){
			console.error("Failed to update appointment:", e);
	}
};

const generateRandomDates = () => {
  // Convert doctorDetails.date to a number for comparison
  const doctorDate = parseInt(doctorDetails.date || "0");

  // Filter dates greater than doctorDetails.date
  const availableDates = date.filter((d) => d > doctorDate);
	
  // Shuffle the filtered dates and take 3 random dates
  const shuffledDates = availableDates.sort(() => 0.5 - Math.random());
  // console.log(shuffledDates)
  return shuffledDates.slice(0, 3);	
};

const getRandomTimes = (timeArray, count) => {
  // Copy the original array to avoid modifying it
  const shuffled = [...timeArray];

  // Fisher-Yates Shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  // console.log(shuffled.slice(0,3))

  return shuffled.slice(0, 3); // Take the first `count` elements
};

const buttonLabel = ref(0);

const updateDate = (formattedDate) => {
  // console.log("Received formatted month and date:", formattedDate);
  buttonLabel.value = formattedDate;
  buttoncase(4,buttonLabel.value,"","Reschedule2")
};

const buttoncase = (type,data,data2,data3 = '') => {
  let message; // Declare the variable outside the switch
  switch (type) {
    case 1:
      message = {
        type: "text",
        content: `View Doctor's Schedule`,
        className: "reply-bubble", // Add a custom class
		category: "Schedule"
      };
      chatMessages.value.push(message);
      input.value.push(message);
      break;
    case 2:
      message = {
        type: "text",
        content: `Reschedule my appointment`,
        className: "reply-bubble", // Add a custom class
		category: "Reschedule"
      };
      chatMessages.value.push(message);
      input.value.push(message);
      break;
	case 3:
	  [
	    {
	      type: "text",
	      content: `Your current appointment is on ${doctorDetails.date || "Doctor"} ${doctorDetails.year || "Doctor"} at ${doctorDetails.time || "Doctor"}`,
	    },
	    {
	      type: "text",
	      content: `Here are some recommended dates`,
	    },
	    {
	      type: "datesBtnGroup",
	      dates: generateRandomDates(), // Add the random dates array
	      category: "Reschedule2",
	    },
	    {
	      type: "another",
	      content: null, // Add the random dates array
	      category: "Reschedule2",
	    },
	  ].forEach(addMessage);
	  break;
	  case 4:
		message = {
		  type: "text",
		  content: `${data} ${data2} `,
		  className: "reply-bubble", // Add a custom class
		  category: `${data3}`,
		};
		chatMessages.value.push(message);
		input.value.push(message);
		break;
		
		case 5:
		  [
		    {
		      type: "text",
		      content: `Here are some available times`,
		    },
		    {
		      type: "timesBtnGroup",
		      dates: getRandomTimes(time), // Add the random dates array
		      category: "Reschedule3",
		    },
		  ].forEach(addMessage);
		  break;
		 case 6:
		   message = {
		     type: "text",
		     content: `${data}`,
		     className: "reply-bubble", // Add a custom class
		     category: "Reschedule3",
		   };
		   chatMessages.value.push(message); // Works correctly
		   input.value.push(message);       // Works correctly
		   break;
		
		case 7:
		  [
		    {
		      type: "text",
		      content: `Would you like to change your appointment to ${state.userInfo.date || "a selected date"} at ${state.userInfo.time || "a selected time"}?`,
		    },
		    {
		      type: "yesorno",
		      options: ["yes", "no"], // Ensure it's options, not content
		      category: "Reschedule4",
		      item: "",
		    },
		  ].forEach(addMessage);
		  break;
		 case 8:
		 		message = {
		 		  type: "text",
		 		  content: `${data}`,
		 		  className: "reply-bubble", // Add a custom class
		 		  category: "Reschedule4",
				  item: `${data2}`,
		 		};
		 		chatMessages.value.push(message);
		 		input.value.push(message);
		 		break;
		case 9:
		  [
		    {
		      type: "text",
		      content: `Congratulations! Your appointment has been changed to ${state.userInfo.date || "a selected date"} at ${state.userInfo.time || "a selected time"}.`,
		    },
		    {
		      type: "text",
		      content: `Would you like to view it in your Appointments?`,
		    },
		    {
		      type: "yesorno",
		      options: ["yes", "no"], // Ensure it's options, not content
		      category: "Reschedule4",
		      item: "view",
		    },
		  ].forEach(addMessage);
		  break;
		case 10:
		  [
		    {
		      type: "text",
		      content: `I am ${doctorDetails.name || "Doctor"}'s bot assistant. How can I help you?`,
		    },
		    {
		      type: "rescheduleBtn",
		      content: null, // Button will be rendered directly in the template
		    },
		    {
		      type: "button",
		      content: null, // Button will be rendered directly in the template
		    },
		  ].forEach(addMessage);
		  break;
		 case 11:
		   [
		     {
		       type: "text",
		       content: `What else can I help you with?`,
		     },
		     {
		       type: "rescheduleBtn",
		       content: null, // Button will be rendered directly in the template
		     },
		     {
		       type: "button",
		       content: null, // Button will be rendered directly in the template
		     },
		   ].forEach(addMessage);
		   break;
		 case 12:
		   [
		     {
		       type: `${data}`,
		       content: null,
		     },
		     {
		       type: "text",
		       content: `These above are some available dates for ${doctorDetails.name || "Doctor"}`,
		     },
		   ].forEach(addMessage);
		   break;
		 case 13:
		   [
		     {
		       type: `${data}`,
		       content: null,
		     }
		   ].forEach(addMessage);
		   break;
		 
    default:
      console.error("Invalid type passed to buttoncase");
  }

};

watch(input, (newMessages, oldMessages) => {
  // Get the newly added message (if any)
  const newMessage = newMessages[newMessages.length - 1];

  // Check if the new message exists and has the specific content
  if (newMessage?.category === "Reschedule") {
    // You can add your logic here, such as calling another function
	buttoncase(3);
  }else if (newMessage?.category === "Schedule"){
	  buttoncase(12,"calendar","text");
	  setTimeout(() => {
	    buttoncase(11);
	  }, 2000); // Delay of 2000ms (2 seconds)
  }else if (newMessage?.category === "Reschedule2") {
	  // state.userInfo.date = 
	state.userInfo.date = newMessage.content; // Use only the content of the latest message
	console.log("Updated userInfo date:", state.userInfo.date); // Debugging
	buttoncase(5)
  }else if (newMessage?.category === "Reschedule3") {
    // You can add your logic here, such as calling another functio
	state.userInfo.time = newMessage.content
	console.log("Upudateadf", state.userInfo.time)
	buttoncase(7)
	
  }else if (newMessage?.category === "Reschedule5") {
    // You can add your logic here, such as calling another functio
	buttoncase(13,"calendar2")
  }else if (newMessage?.category === "Reschedule4") {
	if (newMessage?.content === "yes") {
	  if (!newMessage.item) {
	    // Case where content is "yes" but item is empty
	    rescheduleDate();
	    buttoncase(9);
	    console.log("Rescheduling happened with no item specified.");
	  } else if (newMessage.item === "view") {
	    // Case where content is "yes" and item is "view"
		showPopup.value = true;
	    setTimeout(() => {
	      slibrary.$router.go("/pages/telemedicine/current");
	    }, 2000); // 1000ms = 1 second delay
	    // Perform input logic or prompt for additional input
	  }
	} else {
	  // Handle the case where the response is not "yes"
	  buttoncase(11); // Add a case for this in `buttoncase` for general fallback

	}
  }else{
	  buttoncase(10);
  }
}, { deep: true });


</script>

<style lang="scss" scoped>
	
.flex-wrapper {
  display: flex; /* Enable flexbox for children */
  flex-direction: column; /* Arrange children vertically */
  gap: 10px; /* Add spacing between children */
  width: 100%; /* Ensure full width */
}

.messageBox {
  flex: 1; /* Allows the message box to grow and fill available space */
  width: 100%; /* Full width */
  height: 100%; /* Full height of parent container */
  background: linear-gradient(181deg, rgb(44, 56, 65) 0%, rgb(27, 32, 40) 100%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align chat bubbles at the top */
  padding: 20px; /* Add padding for content */
  box-sizing: border-box; /* Include padding in height calculations */
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
	// padding: 8px 16px;
	font-size: 0.3rem;
	// min-width: 156px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-weight: bold;
	text-transform: uppercase;
	transition: all 0.3s ease-in-out;
	margin-right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
}
.divider {
	width: 100vw; /* Full viewport width */
	height: 1px;
	background-color: #ccc; /* Light grey color */
	margin-left: -40px;
	margin-right: -40px;
}

.chatContainer {
	flex: 1; /* Fills available space */
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	height: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch; /* Smooth scrolling on WebView */;
	
  
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

.chat-bubble,
.reply-bubble {
  max-width: 70%; /* Adjust to fit inside the container */
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


.dates-btn-group {
  display: flex;
  flex-direction: row; /* Arrange items in a row */
  justify-content: space-around; /* Space evenly between buttons */
  gap: 10px; /* Add spacing between buttons */
  margin-top: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e1e2e;
  border: 2px solid #00d1ff;
  border-radius: 12px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
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
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.calendar-container{
	margin-bottom: 0;
	margin-top: 0;
}

.scroll-Y {
	height: 9999rpx;
}
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}
.scroll-view-item {
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}
.scroll-view-item_H {
	display: inline-block;
	width: 60%;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
	font-size: 36rpx;
}

</style>