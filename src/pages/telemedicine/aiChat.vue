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
		<view class="chatContainer" ref="chatContainer">
			
			<view
			  v-for="(message, index) in chatMessages"
			  :key="index"
			  :class="[message.className || 'chat-bubble']"
			>
			  <template v-if="message.type === 'text'">
			    {{ message.content }}
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
			        @click="buttoncase(4, date, 'December')"
			      >
			        <text class="button-text">{{ date }}</text>
			      </view>
			    </view>
			  </template>
			  <template v-else-if="message.type === 'current'">
			    <view class="action-button" @click="buttoncase(4, doctorDetails.date)">
			      <image class="icon" src="@/static/calendar.png" alt="Calendar Icon" />
			      <text class="button-text">Currently Selected</text>
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
			        @click="buttoncase(8, option)"
			      >
			        <text class="button-text">{{ option }}</text>
			      </view>
			    </view>
			  </template>
			</view>
				
		</view>
	<!-- 				<view class="divider"></view>
			<view class="speech-button">	
				<image class="icon" src="@/static/mic.png" alt="Microphone Icon" />
				<text class="button-text">SPEECH TO CHAT</text>
			 </view> -->
	  </view>
					  
 </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import { ref, reactive, onMounted } from "vue";
import { watch } from "vue";
import { createAppointment, updateAppointment } from "@/utils/auth.ts"; 

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

// Populate doctor details from the route on load
onLoad((options) => {
  console.log("Routed Data:", options);
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
const addMessage = (newMessage) => {
  chatMessages.value.push(newMessage); // Push the new message
  scrollToBottom(); // Scroll to the bottom of the chat
};

// Scroll to the bottom of the chat container
const scrollToBottom = () => {
  const chatContainer = document.querySelector(".chatContainer");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

onMounted(() => {
    chatMessages.value.push(
      {
        type: "text",
        content: `Good Morning! I am ${doctorDetails.name || "Doctor"}'s bot assistant. How can I help you today?`,
      },
      {
        type: "rescheduleBtn",
        content: null, // Button will be rendered directly in the template
      },
      {
        type: "button",
        content: null, // Button will be rendered directly in the template
      }
    );
});


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
			console.log('Request:', request);
			
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
  console.log(shuffledDates)
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
  console.log(shuffled.slice(0,3))

  return shuffled.slice(0, 3); // Take the first `count` elements
};

const buttoncase = (type,data,data2 = '') => {
  let message; // Declare the variable outside the switch
  switch (type) {
    case 1:
      message = {
        type: "text",
        content: `View Doctor's Schedule`,
        className: "reply-bubble", // Add a custom class
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
	 chatMessages.value.push(
	   {
		 type: "text",
		 content: `Your current appointment is on ${doctorDetails.date || "Doctor"} ${doctorDetails.year || "Doctor"} at ${doctorDetails.time || "Doctor"}  `,
	   },
	   {
	   	 type: "text",
	   	 content: `Here are some recommended dates`,
	   },
	   {
	         type: "datesBtnGroup",
	         dates: generateRandomDates(), // Add the random dates array
			 category: "Reschedule2"
	    },
		{
		      type: "current",
		      content: null, // Add the random dates array
			  category: "Reschedule2"
		},
		
	 );
	  break;
	  case 4:
		message = {
		  type: "text",
		  content: `${data} ${data2}`,
		  className: "reply-bubble", // Add a custom class
		  category: "Reschedule2"
		};
		chatMessages.value.push(message);
		input.value.push(message);
		break;
		
		case 5:
		 chatMessages.value.push(
			 {
				 type: "text",
				 content: `Here are some recommended times`,
			 },
			 {
				   type: "timesBtnGroup",
				   dates: getRandomTimes(time), // Add the random dates array
				   category: "Reschedule3"
			},
				
		 );
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
		  chatMessages.value.push(
		    {
		      type: "text",
		      content: `Would you like to change your appointment to ${state.userInfo.date || "a selected date"} at ${state.userInfo.time || "a selected time"}?`,
		    },
		    {
		      type: "yesorno",
		      options: ["yes", "no"], // Ensure it's options, not content
		      category: "Reschedule4",
		    }
		  );
		  break;
		 case 8:
		 		message = {
		 		  type: "text",
		 		  content: `${data}`,
		 		  className: "reply-bubble", // Add a custom class
		 		  category: "Reschedule4"
		 		};
		 		chatMessages.value.push(message);
		 		input.value.push(message);
		 		break;
		case 9:
		  chatMessages.value.push(
		    {
		      type: "text",
		      content: `Congrats! Your appointment has been changed to ${state.userInfo.date || "a selected date"} at ${state.userInfo.time || "a selected time"}. Would you like to view it ??`,
		    }
		  );
		 
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
  }else if (newMessage?.category === "Reschedule2") {
	  // state.userInfo.date = 
	state.userInfo.date = newMessage.content; // Use only the content of the latest message
	console.log("Updated userInfo date:", state.userInfo.date); // Debugging
	buttoncase(5)
  }if (newMessage?.category === "Reschedule3") {
    // You can add your logic here, such as calling another functio
	state.userInfo.time = newMessage.content
	console.log("Upudateadf", state.userInfo.time)
	buttoncase(7)
	
  }if (newMessage?.category === "Reschedule4") {
    // You can add your logic here, such as calling another functio
	rescheduleDate()
	buttoncase(9)
	// buttoncase(8)
	console.log("happened")
	}
}, { deep: true });

</script>

<style lang="scss" scoped>
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
  flex: 1; /* Fill the remaining height of the messageBox */
  overflow-y: auto; /* Add scrolling if content overflows */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between chat bubbles */
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
</style>