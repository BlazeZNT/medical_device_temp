<template>
	<LayoutContent showBack @back="handleClickHome">
		<view class="pageView">
			<view class="pageView-title">Patient Detail</view>
			<view class="form">
				<uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
					<view class="column">
						<uni-forms-item label="Tell your health compliaints" name="healthComplaints">
							<uni-easyinput type="textarea" v-model="state.userInfo.name" placeholder="Name" />
						</uni-forms-item>
					</view>
					<view class="column" >
						
						<uni-forms-item label="Select Date" name="date" >
							<BasicButton
							  @click="handleClickCalendar"
							  :class="['calendarButton', { 'calendarButton-clicked': showCalendar }]"
							>
							  {{buttonLabel}}
							</BasicButton>
						</uni-forms-item>
					</view>
					<div>
						<!-- <BasicButton @click="logging">
							Submit
						</BasicButton> -->
					    <div v-if="showCalendar">
					        <CustomCalendar @update-date="updateDate" />
					    </div>
						
					</div>
					<view class="column" >
						<uni-forms-item label="Time" class="timeButtons">
						  <view class="timeButtons">
						      <BasicButton
						          v-for="(time, index) in times"
						          :key="index"
						          @click="handleClick(index, time)"
						          :class="['custom-button', { 'button-clicked': clickedButton === index }]"
						      >
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

	</LayoutContent>
</template>

<script setup>
import LayoutContent from "@/components/Layout/Content.vue";
import slibrary from "@/slibrary/index.js";
import BasicButton from "@/components/BasicButton/index.vue";
import CodeInput from "@/components/CodeInput/index.vue";
import CustomCalendar from "@/components/customCalendar/index.vue";
import { createAppointment } from "@/utils/auth.ts"; // Import the API function


import { ref, reactive } from "vue";

const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "21:00", "22:00", "22:30", "23:00", "23:30"]; // Button labels
const clickedButton = ref(null);

const handleClick = (index, time) => {
  clickedButton.value = index; // Set the clicked button's index
  state.userInfo.time = time; // Save the selected time into userInfo
  console.log("Selected Time:", time); // Log the selected time
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
  slibrary.$router.go("/pages/telemedicine/index");
};

const showCalendar = ref(false); // State to toggle the calendar visibility
const buttonLabel = ref("SELECT DATE");

const handleClickCalendar = () => {
  showCalendar.value = !showCalendar.value; // Toggle the visibility
  console.log("Calendar visibility toggled:", showCalendar.value);
};

const updateDate = (formattedDate) => {
  console.log("Received formatted month and date:", formattedDate); // Log the formatted date
  buttonLabel.value = formattedDate;
  state.userInfo.date = formattedDate; // Save the formatted date in state
};

const potato = [];
onLoad((options) => {
  console.log("Routed Data:", options);
  // const imageFile = decodeURIComponent(options.image)
  

  // Use the routed data
  potato.push({
    name: decodeURIComponent(options.name || "Unknown"),
    specialization: decodeURIComponent(options.specialization || "Unknown"),
	year: "2024",
    date: decodeURIComponent(options.date || "No date provided"),
	image: decodeURIComponent(options.image || '/static/doctordemo.png')
  });
});

// const test = () => {
//   console.log(
//     "Decoded Test Print:",
//     potato[0]?.name || "Unknown", // Safely access `potato[0]` to avoid errors if it's undefined
//     potato[0]?.specialization || "Unknown",
//     state.userInfo.time || "nothing", // Access `time` from `state.userInfo`
//     state.userInfo.date || "hoho"    // Access `date` from `state.userInfo`
//   );
// };

// const handleClickSubmit = () => {

// 	uni.navigateTo({
// 	  url: `/pages/telemedicine/completeAppointment?${Object.entries(potato[0])
// 	    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
// 	    .join("&")}`,
// 	});
// };

const handleClickSubmit = async () => {
		potato[0].time = state.userInfo.time;
		potato[0].date = state.userInfo.date;
		potato[0].year = state.userInfo.year;

  // Call createAppointment with the form data
  try {
	  
	if (!potato[0].image.startsWith('data:image/png;base64,')) {
		potato[0].image = 'data:image/png;base64,' + potato[0].image;
	
	}
	const base64ToFile = (base64Data, fileName) => {
     const byteCharacters = atob(base64Data.split(',')[1]); // Decode base64 string
     const byteArrays = [];
     
     // Convert the base64 string to a byte array
     for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
       const slice = byteCharacters.slice(offset, offset + 1024);
       const byteNumbers = new Array(slice.length);
       for (let i = 0; i < slice.length; i++) {
         byteNumbers[i] = slice.charCodeAt(i);
       }
       byteArrays.push(new Uint8Array(byteNumbers));
     }
 
     // Create a Blob from the byte arrays and then a File object
     const blob = new Blob(byteArrays, { type: 'image/png' });
     return new File([blob], fileName, { type: 'image/png' });
	 };
	
	const imageFile = base64ToFile(potato[0].image);

    // Call the API function to create the appointment
    await createAppointment(
      potato[0]?.name,
      potato[0]?.specialization,
      state.userInfo.date,
      state.userInfo.time,
      potato[0]?.year,
      imageFile
    );

    // Navigate to the confirmation page after successful submission
    uni.navigateTo({
      url: `/pages/telemedicine/completeAppointment?${Object.entries(potato[0])
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&")}`,
    });

  } catch (error) {
    console.error("Failed to create appointment:", error);
    // Optionally, show an error message
  }
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

		.pinBox {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pinBtn {
				margin-top: 50rpx;
				width: 436rpx;
				display: flex;
				justify-content: center;
			}
		}

		&-title {
			font-family: FB;
			color: #fff;
			font-size: 20px;
			margin-bottom: 20px;

			i {
				color: #06ffb8;
			}
		}
	}
	.form {
		width: 386.46rpx;

		.column {
			display: flex;
			flex-wrap: wrap; /* Optional: This allows the entire column to wrap */
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
		.uni-forms-item__content{
		            display: flex;
		        }

		.uni-easyinput__content.is-input-border {
			background-color: transparent !important;
			border: 1px solid #D8D8D8 !important;
			color: #fff !important;
		}
		.uni-date-x--border {
			border: 1px solid #58FFCF !important;
		}
		
		.uni-date-x {
			background: transparent !important;
			color: #fff !important;
		
		}
		
		.uni-calendar__content {
			// position: absolute;
			// top : 0;
			background: #323D49 !important;
		}
		
		.uni-calendar-item--disable .uni-calendar-item__weeks-box-text-disable {
			color: #666 !important;
		}
		
		.uni-calendar-item__weeks-box-text {
			color: #fff !important;
		}
		
		.uni-datetime-picker--btn {
			background-color: #58FFCF !important;
		}
		
		.calendarButton {
		  background: transparent;
		  border: 1px solid #58FFCF;
		  color: #58FFCF;
		  transition: background-color 0.3s ease, color 0.3s ease;
		  // padding-top: 18px;
		}
		

		
		.calendarButton-clicked {
		  background: #58FFCF;
		  color: black;
		}

		// .uni-select__input-text {
		// 	color: #fff !important;
		// 	font-size: 9rpx !important;
		// 	line-height: 10rpx;
		// }

		// .uni-select__selector {
		// 	background: #323D49 !important;
		// 	box-shadow: 0rpx 7rpx 7rpx 4rpx #1B2028 !important;
		// 	border-radius: 2rpx 2rpx 2rpx 2rpx !important;
		// 	border: none !important;
		// }

		.uni-popper__arrow_bottom {
			display: none !important;
		}

		.uni-select__selector-item {
			padding: 4rpx 6rpx !important;

			text {
				color: #fff !important;
				font-size: 9rpx;
				color: #FFFFFF;
				line-height: 13rpx;
			}
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
			width: 0px;
		}
		
		.button-clicked {
		  color: black;
		  background-color: #58FFCF; /* Persistent color for clicked button */
		}
		.timeButtons{
			// margin-left: 60px;
			display: flex;
			flex-wrap: wrap; /* Allow wrapping to the next line */
			justify-content: center; /* Center the buttons horizontally */
			// margin-top: 5px; /* Add some spacing from the top */
		}
	}
	

</style>