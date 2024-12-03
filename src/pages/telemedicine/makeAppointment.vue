<template>
  <LayoutContent showBack @back="handleClickHome">
    <view class="pageView">
      <view class="pageView-title">Patient Detail</view>
      <view class="form">
		<uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
		  <view v-if="doctorDataAvailable" class="doctor-info-box">
			<image :src="potato[0].image ? 'data:image/jpeg;base64,' + potato[0].image : '/static/doctordemo.png'" class="doctor-image" />
			<view class="doctor-details">
			  <view class="doctor-name">{{ potato[0].name }}</view>
			  <view class="doctor-specialization">{{ potato[0].specialization }}</view>
			  <view class="doctor-date">{{ `${potato[0].date} ${potato[0].year} ${potato[0].time}` }}</view>
			</view>
		  </view>
		  <view v-else class="column">
			<uni-forms-item label="Tell your health complaints" name="healthComplaints">
			  <uni-easyinput type="textarea" v-model="state.userInfo.name" placeholder="Name" />
			</uni-forms-item>
		  </view>
          <view class="column">
            <uni-forms-item label="Select Date" name="date">
              <BasicButton
                @click="handleClickCalendar"
                :class="['calendarButton', { 'calendarButton-clicked': showCalendar }]">
                {{ buttonLabel }}
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
          <BasicButton @click="handleClickSubmit">
            Submit
          </BasicButton>
        </uni-forms>
      </view>
    </view>

    <!-- Loading Spinner -->
    <view v-if="isLoading" class="loading-spinner">
      <uni-icon type="loading" size="40" color="#58FFCF" />
      <view class="loading-text">Submitting...</view>
    </view>
  </LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import CustomCalendar from "@/components/customCalendar/index.vue";
import { createAppointment } from "@/utils/auth.ts"; 

import { ref, reactive } from "vue";

const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "21:00", "22:00", "22:30", "23:00", "23:30"]; 
const clickedButton = ref(null);

const handleClick = (index, time) => {
  clickedButton.value = index;
  state.userInfo.time = time;
  console.log("Selected Time:", time);
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
  console.log("Calendar visibility toggled:", showCalendar.value);
};

const updateDate = (formattedDate) => {
  console.log("Received formatted month and date:", formattedDate);
  buttonLabel.value = formattedDate;
  state.userInfo.date = formattedDate;
};

const doctorInfo = reactive({
  name: "",
  specialization: "",
  date: "",
  year: "",
  time: "",
  image: "",
});

const doctorDataAvailable = ref(false);

const potato = [];
onLoad((options) => {
  // console.log("Routed Data:", options);

  // potato.push({
  //   name: decodeURIComponent(options.name || "Unknown"),
  //   specialization: decodeURIComponent(options.specialization || "Unknown"),
  //   year: "2024",
  //   date: decodeURIComponent(options.date || "No date provided"),
  //   image: decodeURIComponent(options.image || '/static/doctordemo.png')
  // });	
  // Check if options exist and have values
    if (options && Object.keys(options).length > 0) {
      console.log("Routed Data:", options);
  
      // Check the source of the route
      if (options.sourcePage === "current") {
        // console.log("This is from current !!!");
			potato.push({
			  name: decodeURIComponent(options.name || "Unknown"),
			  specialization: decodeURIComponent(options.specialization || "Unknown"),
			  year: decodeURIComponent(options.year || "2024"),
			  date: decodeURIComponent(options.date || "No date provided"),
			  time: decodeURIComponent(options.time) || "No time",
			  image: decodeURIComponent(options.image || "/static/doctordemo.png"),
			});
  	        // doctorInfo.name = decodeURIComponent(options.name || "Unknown");
  	        // doctorInfo.specialization = decodeURIComponent(options.specialization || "Unknown");
  	        // doctorInfo.date = decodeURIComponent(options.date || "No date provided");
  	        // doctorInfo.year = decodeURIComponent(options.year || "2024");
  	        // doctorInfo.time = decodeURIComponent(options.time || "No time");
  	        // doctorInfo.image = decodeURIComponent(options.image || "/static/doctordemo.png");
  	        doctorDataAvailable.value = true;
  	      
      } else {
        // Push the routed data into the potato array
        potato.push({
          name: decodeURIComponent(options.name || "Unknown"),
          specialization: decodeURIComponent(options.specialization || "Unknown"),
          year: decodeURIComponent(options.year || "2024"),
          date: decodeURIComponent(options.date || "No date provided"),
  		  time: decodeURIComponent(options.time) || "No time",
          image: decodeURIComponent(options.image || "/static/doctordemo.png"),
        });
  
     //    console.log("Processed Data:", potato);
  	  // console.log("This is from appointmentlist")
      }
    } else {
      console.log("No valid data found in options.");
      // Handle the case where options are empty or invalid
    }

});

const isLoading = ref(false); // Loading state

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
	  } catch (error) {
		console.error("Failed to create appointment:", error);
		
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
	// else {
	//   doctorInfo.time = state.userInfo.time; 
	//   doctorInfo.date = state.userInfo.date;
	//   doctorInfo.year = state.userInfo.year;
	  
	//   try {
	// 	// Show loading spinner
	// 	isLoading.value = true;

	// 	const response = await createAppointment(
	// 	  doctorInfo.name,
	// 	  doctorInfo.specialization,
	// 	  doctorInfo.date, 
	// 	  doctorInfo.time,
	// 	  doctorInfo.year, 
	// 	  doctorInfo.image,
	// 	);

	// 	if (response) {
	// 	  console.log("Appointment created successfully!");
	// 	  // Navigate to the confirmation page after successful submission
	// 	}
	//   } catch (error) {
	// 	console.error("Failed to create appointment:", error);
	//   } finally {
	// 	// Hide loading spinner after the operation is complete
	// 	isLoading.value = false;

	// 	uni.navigateTo({
	// 	  url: `/pages/telemedicine/completeAppointment?${Object.entries(doctorInfo)
	// 		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
	// 		.join("&")}`,
	// 	});
	//   }
	// }

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
    max-width: 100px;
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

</style>
