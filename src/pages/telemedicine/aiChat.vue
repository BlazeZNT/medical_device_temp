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
				    <button class='recordBtn'>FISNISH</button>
				  </view>
				 <view class="divider"></view>
				</view>
				<view class= "chatContainer">
					<view class="column">
						<view class="chat-bubble">
						  Good Morning! I am Doctor Richardson's bot assistant.
						</view>
					</view>

					<view class="column">
					  <view class="chat-bubble">
						What can I help you today?
					  </view>
					</view>
					
					<view class="column">
					  <view class="action-button">
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
import BasicButton from "@/components/BasicButton/index.vue";
import { ref, reactive } from "vue";



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
  slibrary.$router.go("/pages/telemedicine/current");
};
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

.chat-bubble {
  display: inline-block;
  padding: 5px 10px;
  background-color: #2B333A;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 14px;
  color: white;
  text-align: center;
  max-width: 80%;
  margin-top: 10px;
  margin-bottom: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: start;
  padding: 10px 10px;
  background-color: #1e1e2e; /* Dark background color */
  border: 2px solid #00d1ff; /* Gradient-like border effect */
  border-radius: 12px; /* Rounded corners */
  color: white; /* Text color */
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: auto;
  margin-top: 10px;
  margin-bottom: 5px;
  
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

.chatContainer{
	height: 350px;
}


</style>