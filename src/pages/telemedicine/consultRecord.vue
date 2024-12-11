<template>
  <LayoutContent showBack @back="handleClickHome">
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
				
				    <view class="doctor-info">
				      <div class="doc-details">
				        <view class="day-time">Date & Time</view>
				        <view class="doctor-date">{{ `${doctorDetails.date} ${doctorDetails.year} ${doctorDetails.time}` }}</view>
				      </div>
				    </view>
				
				    <button class='recordBtn' @click="handleClickPrint()">VIEW RECORD</button>
				  </view>
				</view>
				<view class="column">
				  <view class="uni-title">Doctor's Diagnosis</view>
				  <view class="diagnosis-section">
				    <text class="diagnosis-title"><b>Influenza (Flu)</b></text>
				    <text class="diagnosis-details">
				      The viruses that cause flu spread at high levels during certain times of the year in the Northern and Southern hemispheres.
				      These are called flu seasons. During times when flu is widespread, you may not need a flu test.
				    </text>
				  </view>
				</view>
				
				<view class="column">
				  <view class="uni-title">Doctors Suggestions</view>
				  <view class="suggestions-section">
				    <ul class="suggestions-list">
				      <li>Take a rest</li>
				      <li>Get disciplined with taking medicine on prescription</li>
				    </ul>
				  </view>
				</view>
					<view class="column">
						<view class="uni-title">Prescriptions</view>
						<view class="prescriptionsbox">
						  <view class="prescriptionscontent">
						    <image src="@/static/medi1.png" class="image-responsive"></image>
						    <view class="image-text">
						      <b class="prescription-name">Simetichone</b>
						      <view class="prescription-details">
						        1 morning, 1 night (before food)
						      </view>
						    </view>
						  </view>
						  <view class="prescriptionscontent">
						    <image src="@/static/medi2.png" class="image-responsive"></image>
						    <view class="image-text">
						      <b class="prescription-name">Antacids</b>
						      <view class="prescription-details">
						        1 morning, 1 night (before food)
						      </view>
						    </view>
						  </view>
						</view>
					</view>
					<!-- <view class="column">
					  <basicButton class="back">
						  BACK TO PAGE
					  </basicButton>
					</view> -->
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
  // console.log("Routed Data:", options);

  // Populate the reactive doctorDetails object
  doctorDetails.name = decodeURIComponent(options.name || "Unknown");
  doctorDetails.specialization = decodeURIComponent(options.specialization || "Unknown");
  doctorDetails.date = decodeURIComponent(options.date || "No date provided");
  doctorDetails.time = decodeURIComponent(options.time || "No time");
  doctorDetails.year = decodeURIComponent(options.year || "2024");
  doctorDetails.image = decodeURIComponent(options.image || '/static/doctordemo.png');
  
  state.diagnosis =
      "Influenza (Flu) The viruses that cause flu spread at high levels during certain times of the year in the Northern and Southern hemispheres. These are called flu seasons. During times when flu is widespread, you may not need a flu test.";
  
	state.suggestions =
	  "Take a rest. Get discipline with taking medicine on prescription.";

  // console.log("Parsed Doctor Details:", doctorDetails);
  
});

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/consultHistory");
};

const handleClickPrint = () => {
	// slibrary.$router.go("/pages/telemedicine/printPage")
	console.log("sent to print")
	if (doctorDetails) {
	// Construct query parameters from the doctorDetails object
	const queryParams = Object.entries(doctorDetails)
	  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
	  .join("&");
	console.log("done sent",doctorDetails.name)
	// Navigate to the detail page with serialized doctor details
	uni.navigateTo({
	  url: `/pages/telemedicine/printPage?${queryParams}`,
	});
	}
}
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
	padding: 40px;
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
.prescriptionsbox {
  display: flex; /* Use flexbox layout */
  flex-wrap: wrap; /* Allow wrapping if items exceed container width */
  // justify-content: space-between; /* Add spacing between boxes */
  width: 100%; /* Match the column width */
  max-width: 100%;
  box-sizing: border-box;
}

.prescriptionscontent {
  display: flex; /* Arrange image and text horizontally */
  align-items: flex-start; /* Align items at the start vertically */
  gap: 15px; /* Add spacing between the image and the text */
  // margin-bottom: 20px; /* Add spacing between prescriptions */
  padding: 7px;
  border: 1px solid #ccc; /* Optional: Add a border */
  border-radius: 8px; /* Optional: Rounded corners */
  margin-left: 10px;
  // background-color: #2b2b2b; /* Optional: Background color */
}

.image-responsive {
  max-width: 50px;
  max-height: 50px;
  border-radius: 8px; /* Optional: Rounded edges for the image */
}

.image-text {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Space between lines of text */
  color: white; /* Text color */
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
  width: 386.46rpx;
}

:deep() {
  .uni-forms-item {
    flex: 1;
  }
  .uni-easyinput__content-textarea[data-v-af395001] {
    position: relative;
    overflow: hidden;
    flex: 1;
    line-height: 1.5;
    font-size: 14px;
    margin: 6px;
    margin-left: 0;
    height: 80px;
    min-height: auto; 
    width: auto;
    /* margin-bottom: 20px; */
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
	padding: 3px;
  }
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
			
			.day-time{
				max-width: 3rem;
				font-weight: bold;
				margin-bottom: 4px;
				display:flex;
				font-size: 0.3rem;
				color: #58FFCF;
				text-align: left;
				margin-bottom: 4px;
			}

            .doctor-specialization {
              color: #a0a0a0;
              margin-bottom: 4px;
			  text-align: left;
			  font-size: 0.23rem;
            }
			
			.doctor-date{
				font-size: 0.2rem;
				text-transform: uppercase;
			}
			
		}
}
.recordBtn {
  margin: white;
  background-color: transparent;
  padding-left: 7px;
  padding-right: 7px;
  border: 1px solid #58FFCF;
  font-size: 14px; /* Adjust font size here */
  color: #58FFCF; /* Optional: Ensure text color is visible */
  border-radius: 4px; /* Optional: Add rounded corners */
  cursor: pointer; /* Optional: Show pointer cursor on hover */
  margin: inherit;
}

.form{
	width: 70%;
}

.diagnosis-section {
  padding: 10px; /* Padding around the diagnosis content */
  background-color: transparent; /* Background color for contrast */
  border-radius: 8px; /* Rounded corners for better appearance */
  border: 1px solid #D8D8D8;
}

.diagnosis-title {
  font-size: 12px; /* Slightly larger font size for the title */
  font-weight: bold; /* Make the title bold */
  color: white; /* Highlight the title in a specific color */
  // margin-bottom: 10px; /* Add space below the title */
  display: block; /* Ensure it appears as a block element */
}

.diagnosis-details {
  font-size: 12px; /* Standard font size for content */
  line-height: 1.6; /* Add line spacing for readability */
  color: white; /* Text color for content */
}

.suggestions-section {
	padding: 10px; /* Add padding around the suggestions */
	background-color: transparent; /* Background color for the suggestions section */
	border-radius: 8px; /* Rounded corners for a polished look */
	border: 1px solid #D8D8D8
}

.suggestions-list {
  list-style-type: disc; /* Add bullet points */
  color: white; /* Text color */
  font-size: 12px; /* Standard font size */
  line-height: 1.6; /* Increase line spacing for readability */
}

</style>
