<template>
  <LayoutContent showBack @back="handleClickHome">
    <view class="pageView">
	  <view v-if="doctorDataAvailable" class="pageView-title">Reschedule</view>
      <view v-else class="pageView-title">Patient Detail</view>
      <view class="form">
        <uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
          <view v-if="doctorDataAvailable" class="doctor-info-box">
            <image :src="potato[0].image ? 'data:image/jpeg;base64,' + potato[0].image : '/static/doctordemo.png'" class="doctor-image" />
            <view class="doctor-details">
              <view class="doctor-name">{{ potato[0].name }}</view>
              <view class="doctor-specialization">{{ potato[0].specialization }}</view>
            </view>
			<view class="time-details">
				<view class="day-time">Date & Time</view>
				<view class="doctor-date">{{ `${potato[0].date} ${potato[0].year} ${potato[0].time}` }}</view>
			</view>
          </view>
          <view v-else class="column">
            <uni-forms-item label="Tell your health complaints" name="healthComplaints">
				<div class="textarea-container">
				   <div class="textarea-content" contenteditable="true">{{ transcription }}</div>
					<button v-if = "isRecording" class="record-button" @click="endRecord">Stop</button>
					<button  v-else class="record-button" @click="startRecord">Record</button>
					  <div v-if="isRecording" class="sound-wave">
						<span class="wave"></span>
						<span class="wave"></span>
						<span class="wave"></span>
					  </div>
				</div>
            </uni-forms-item>
          </view>
<!-- 		  <view class="page">
		    <view class="controls">
		      <button @click="playVoice" :disabled="!voicePath">Play Recording</button>
		    </view>
		    <view v-if="voicePath">
		      <h4>Recorded File Path:</h4>
		      <p>{{ voicePath }}</p>
		    </view>
		  	 <view v-if="transcription">
		  		  <h4>Transcription:</h4>
		  		  <p>{{ transcription }}</p>
		  	</view>
		  </view> -->
          <view class="column">
            <uni-forms-item label="Select Date" name="date">
              <BasicButton
                @click="handleClickCalendar"
                :class="['calendarButton', { 'calendarButton-clicked': showCalendar }]">
                {{ buttonLabel }}
              </BasicButton>
			  <BasicButton v-if="doctorDataAvailable" class = "assistantBtn" @click="handleClickChat">
				  GET DOCTOR ASSISTANT BUTTON
			  </BasicButton>
            </uni-forms-item>
          </view>
          <div>
            <div v-if="showCalendar">
              <CustomCalendar @update-date="updateDate" />
            </div>
          </div>
          <view class="column">
            <uni-forms-item label="Time" class="timeButtons">
              <view class="timeButtons">
                <BasicButton
                  v-for="(time, index) in times"
                  :key="index"
                  @click="handleClick(index, time)"
                  :class="['custom-button', { 'button-clicked': clickedButton === index }]">
                  {{ time }}
                </BasicButton>
              </view>
            </uni-forms-item>
          </view>
          <!-- Conditionally render the button -->
          <BasicButton v-if="doctorDataAvailable" @click="openUpdateModal">
            UPDATE
          </BasicButton>
          <BasicButton v-else @click="handleClickSubmit">
            Submit
          </BasicButton>
        </uni-forms>
      </view>
    </view>

    <!-- Loading Spinner -->
<!--    <view v-if="isLoading" class="loading-spinner">
      <uni-icon type="loading" size="40" color="#58FFCF" />
      <view class="loading-text">Submitting...</view>
    </view> -->
	<view v-if="showUpdateModal" class="modal-overlay">
	  <view class="modal">
	    <view class="modal-header">Confirm Update</view>
	    <view class="modal-body">
	      Are you sure you want to update the appointment details?
	    </view>
	    <view class="modal-footer">
	      <button class="modal-btn confirm" @click="confirmUpdate">Yes</button>
	      <button class="modal-btn cancel" @click="closeUpdateModal">No</button>
	    </view>
	  </view>
	</view>
  </LayoutContent>
</template>


<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import CustomCalendar from "@/components/customCalendar/index.vue";
import { createAppointment, updateAppointment } from "@/utils/auth.ts"; 
import { ref, reactive, onMounted } from "vue";
import { useAppStore } from "@/stores/app"; // Import the store
import { transcribeAudio } from '@/utils/auth';

const appStore = useAppStore(); // Access the Pinia store

// const transcript = ref('')
const isRecording = ref(false)



const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "21:00", "22:00", "22:30", "23:00", "23:30"]; 
const clickedButton = ref(null);

// const ToggleMic = () => {
// 	isRecording.value = !isRecording.value
// }
const recordingPath = ref(''); // Stores the path of the recorded audio



// Initialize recorder manager and audio context
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;

// Define reactive variables
const voicePath = ref('');
const transcription = ref('');
// Setup recorder manager event handlers
onMounted(() => {
	recorderManager.onStop((res) => {
	  console.log('Recorder stopped:', res);
	  voicePath.value = res.tempFilePath;
	  if (voicePath.value) {
		transcribeRecording(); // Ensure this function works as expected
	  }
	});
});

// Methods for recording and playback
const startRecord = () => {
  console.log('Start recording');
  recorderManager.start();
  isRecording.value = !isRecording.value
};

const endRecord = () => {
  console.log('Stop recording');
  recorderManager.stop();

  

  
};

const playVoice = () => {
  if (voicePath.value) {
    console.log('Play recording:', voicePath.value);
    innerAudioContext.src = voicePath.value;
    innerAudioContext.play();
  }
};


const transcribeRecording = async () => {
  if (voicePath.value) {
    try {
      console.log('Uploading audio for transcription...');
      transcription.value = await transcribeAudio(voicePath.value); // Update the reactive variable
	  isRecording.value = !isRecording.value
      console.log('Transcription:', transcription.value);
    } catch (err) {
      console.error('Error during transcription:', err);
      uni.showToast({
        title: 'Transcription failed',
        icon: 'none',
      });
	  isRecording.value = !isRecording.value
    }
  } else {
    uni.showToast({
      title: 'No audio to transcribe',
      icon: 'none',
    });
	isRecording.value = !isRecording.value
  }
};


// const handleTextChange = (event) => {
//   transcript.value = event.target.innerText;
// };

const handleClick = (index, time) => {
  clickedButton.value = index;
  state.userInfo.time = time;
  // console.log("Selected Time:", time);
};

const state = reactive({
  step: 1,
  userInfo: {
    date: "",
    time: "",
    year: "2024"
  },
});

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/choicePage");
};



const showCalendar = ref(false); 
const buttonLabel = ref("SELECT DATE");

const handleClickCalendar = () => {
  showCalendar.value = !showCalendar.value; 
  // console.log("Calendar visibility toggled:", showCalendar.value);
};

const updateDate = (formattedDate) => {
  // console.log("Received formatted month and date:", formattedDate);
  buttonLabel.value = formattedDate;
  state.userInfo.date = formattedDate;
};


const doctorDataAvailable = ref(false);
const currentDocID = ref(0)
const currentDocImg = ref('')
const currentDocName = ref('')
const currentDocSpec = ref('')
const currentDocDate = ref('')
const currentDocYear = ref('')
const currentDocTime = ref('')
const potato = [];
onLoad((options) => {
	currentDocID.value = decodeURIComponent(options.id);  // console.log("Routed Data:", options);
	currentDocImg.value = decodeURIComponent(options.image);  // console.log("Routed Data:", options);
	currentDocName.value = decodeURIComponent(options.name);  // console.log("Routed Data:", options);
	currentDocSpec.value = decodeURIComponent(options.specialization);  // console.log("Routed Data:", options);
	currentDocDate.value = decodeURIComponent(options.date);  // console.log("Routed Data:", options);
	currentDocYear.value = decodeURIComponent(options.year);  // console.log("Routed Data:", options);
	currentDocTime.value = decodeURIComponent(options.time);
	
  // Check if options exist and have values
    if (options && Object.keys(options).length > 0) {
      // console.log("Routed Data:", options);
	  
  
      // Check the source of the route
      if (options.sourcePage === "current") {

			potato.push({
			  id: decodeURIComponent(options.id || "Unknown"),
			  name: decodeURIComponent(options.name || "Unknown"),
			  specialization: decodeURIComponent(options.specialization || "Unknown"),
			  year: decodeURIComponent(options.year || "2024"),
			  date: decodeURIComponent(options.date || "No date provided"),
			  time: decodeURIComponent(options.time) || "No time",
			  image: decodeURIComponent(options.image || "/static/doctordemo.png"),
			});
			doctorDataAvailable.value = true; 
  	      
      } else {
        // Push the routed data into the potato array
        potato.push({
		  id: decodeURIComponent(options.id || "Unknown"),
          name: decodeURIComponent(options.name || "Unknown"),
          specialization: decodeURIComponent(options.specialization || "Unknown"),
          year: decodeURIComponent(options.year || "2024"),
          date: decodeURIComponent(options.date || "No date provided"),
  		  time: decodeURIComponent(options.time) || "No time",
          image: decodeURIComponent(options.image || "/static/doctordemo.png"),
        });
  
      }
    } else {
      console.log("No valid data found in options.");
      // Handle the case where options are empty or invalid
    }

});

const isLoading = ref(false); // Loading state

  const handleClickUpdate = async () => {
    try{
    	isLoading.value = true;
		potato.time = state.userInfo.time;
		potato.date = state.userInfo.date;
		potato.year = state.userInfo.year;
		
		const request = {  
			imageBase64: currentDocImg.value,
			name: currentDocName.value,
			specialization: currentDocSpec.value,
			year: potato.year,
			date: potato.date,
			time: potato.time
		};
		
		const response = await updateAppointment(currentDocID.value, request);
		if(response){
			
			 appStore.addNotification({
				id: currentDocName.id,
				name: currentDocName.value,
				olddate: currentDocDate.value,
				oldtime: currentDocTime.value,
				olddyear: currentDocYear.value,
				date: decodeURIComponent(potato.date || 'No date provided'),
				year: decodeURIComponent(potato.year || 'No year'),
				time: decodeURIComponent(potato.time || 'No time'),
				image: decodeURIComponent(currentDocName.image || 'No time'),
				message: `Appointment with Dr. ${currentDocName.value} has been updated to ${potato[0].date} at ${potato[0].time}.`,
				source: "update"
			      });
				  
			isLoading.value = false;
			slibrary.$router.go("/pages/telemedicine/current");
			
		}
		
		
		
    }catch(e){
		console.error("Failed to update appointment:", e);
    }

  };

const handleClickSubmit = async () => {
	// if (potato[0].name === "Unknown") {
	  potato[0].time = state.userInfo.time;
	  potato[0].date = state.userInfo.date;
	  potato[0].year = state.userInfo.year;

	  try {
		// Show loading spinner
		isLoading.value = true;

		const response = await createAppointment(
		  potato[0]?.name,
		  potato[0]?.specialization,
		  potato[0].date, 
		  potato[0].time,
		  potato[0]?.year, 
		  potato[0]?.image,
		);
		
		if (response) {
		  console.log("Appointment created successfully!");
		  // Navigate to the confirmation page after successful submission
	   
		}
	  } catch (e) {
		console.error("Failed to create appointment:", e);
		
	  } finally {
		// Hide loading spinner after the operation is complete
		isLoading.value = false;
		uni.navigateTo({
		  url: `/pages/telemedicine/completeAppointment?${Object.entries(potato[0])
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
			.join("&")}`,
		});
	  }
};

const handleClickChat = () => {
	uni.navigateTo({
	  url: `/pages/telemedicine/aiChat?${Object.entries(potato[0])
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join("&")}`,
	});	
	// slibrary.$router.go("/pages/telemedicine/aiChat");
	
}

const showUpdateModal = ref(false); // State to control modal visibility

const openUpdateModal = () => {
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

const confirmUpdate = async () => {
  closeUpdateModal(); // Close modal after confirmation
  await handleClickUpdate(); // Call the original update function
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
	color: white;
}

.form {
  width: 386.46rpx;
  .column {
    display: flex;
    flex-wrap: wrap; 
    width: 100%;
  }
}

:deep() {
  .uni-forms-item {
    flex: 1;
  }

  .uni-forms-item__label {
    font-family: FL;
    text {
      color: #58FFCF;
      font-size: 9rpx !important;
      line-height: 10rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  .uni-forms-item__content {
    display: flex;
  }
  .uni-easyinput__content.is-input-border {
    background-color: transparent !important;
    border: 1px solid #D8D8D8 !important;
    color: #fff !important;
  }
  .calendarButton {
    background: transparent;
    border: 1px solid #58FFCF;
    color: #58FFCF;
    transition: background-color 0.3s ease, color 0.3s ease;
  } 

  .calendarButton-clicked {
    background: #58FFCF;
    color: black;
  }
  .custom-button {
    flex: 1 1 auto;
    max-width: 82px;
    min-width: 79px;
    margin: 5px;
    font-size: 14px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: transparent;
    color: #58FFCF;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .button-clicked {
    color: black;
    background-color: #58FFCF;
  }
  .timeButtons {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
  }
}

/* Loading Spinner Style */
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  margin-left: 10px;
  color: #58FFCF;
  font-size: 16px;
}

.doctor-info-box {
	display: flex;
	align-items: center;
	gap: 16px;
	background-color: #29353d;
	border-radius: 8px;
	padding: 16px;
	color: white;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
	margin-top: 30px;
	margin-bottom: 30px;
	justify-content: space-evenly;
}

.doctor-image {
  width: 70px;
  height: 70px;
  border-radius: 20%;
  object-fit: cover;
}

.doctor-details {
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-size: 18px;
  font-weight: bold;
}

.doctor-specialization {
  font-size: 14px;
  color: #a0a0a0;
}

.doctor-date {
  font-size: 12px;
  color: #58ffcf;
}

.assistantBtn{
	margin-left: 20px;
}

.textarea-container {
  display: flex;
  position: relative; /* Set relative positioning for the parent */
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  padding: 8px;
  background-color: #29353d;
  color: white;
  min-height: 100px;
  width: 100%;
}

.textarea-content {
  flex: 1;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  color: white;
  overflow-y: auto;
  max-height: 150px;
}

.record-button {
  position: absolute; /* Position the button absolutely within the container */
  bottom: 8px; /* Align to the bottom of the container */
  right: 8px; /* Align to the right side of the container */
  background-color: #58ffcf;
  color: black;
  border: none;
  border-radius: 3px; /* Slightly smaller border radius */
  padding: 3px 6px; /* Reduce padding to make the button smaller */
  font-size: 12px; /* Smaller font size */
  cursor: pointer;
}

.sound-wave {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.wave {
  width: 4px;
  height: 10px;
  background-color: #58ffcf;
  border-radius: 2px;
  animation: wave-animation 1s infinite ease-in-out;
}

.wave:nth-child(2) {
  animation-delay: 0.2s;
}

.wave:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wave-animation {
  0%, 100% {
    height: 10px;
  }
  50% {
    height: 20px;
  }
}

h4{
	color: white;
	margin-bottom: 10px;
	margin-top: 10px;
}

.notification-message{
	color: white;
	font-size: 14px;
}

.currenttime {
  font-size: 12px;         
  color: rgba(255, 255, 255, 0.6); 
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 400px;
  background: linear-gradient(145deg, #1B262B, #29353D);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  color: white;
}

.modal-header {
  font-size: 18px;
  font-weight: bold;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  color: #58FFCF;
}

.modal-body {
  padding: 16px;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}

.modal-btn {
  padding: 0px 18px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-btn.cancel {
  background-color: red;
  color: white;
}

.modal-btn.close {
  background-color: gray;
  color: white;
}

.modal-btn:hover {
  opacity: 0.9;
}

.simple-textarea {
  width: 100%;
  height: 100px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* Allows resizing vertically */
  outline: none;
  color:white;
}

.simple-textarea::placeholder {
  color: #aaa;
}
</style>
