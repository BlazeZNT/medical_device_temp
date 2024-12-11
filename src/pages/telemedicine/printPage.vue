<template>
  <view class="container">
	  <view class="content">
		<view class="header">
			<view class="textBox left">
				<view class="label">Patient Name</view>
				<view class="value">Debra Robertson</view>
			</view>
			<view class="textBox">
				<view class="label">Date of Birth</view>
				<view class="value">10/11/1996</view>
			</view>
			<view class="textBox">
				<view class="label">Gender</view>
				<view class="value">Female</view>
			</view>
			<view class="textBox">
				<view class="label">Age</view>
				<view class="value">38</view>
			</view>
		</view>
		<view class="top">
		  <view class="leftback">
		    <image src="@/static/back.png" class="image-link" @click="handleItemClick(1)" />
		  </view>
		  <view class="page-title">
		    <text class="title">Post Consultation</text>
		  </view>
		</view>
		<view class="section">
		  <view class="title-details">
			<view class="imagebox">
				<image :src="'data:image/jpeg;base64,' + doctorDetails.image" class="doctor-image" />
			</view>
			<div class="doc-details">
			  <view class="doctor-name">{{ doctorDetails.name }}</view>
			  <view class="doctor-specialization">{{ doctorDetails.specialization }}</view>
			</div>      
		  </view>
		</view>
		
		
		<view class="section-title">
			<text>Date & Time Consultation</text>
		</view>
		<view class="section">
		  <view class="details">
			  <view class="doctor-time">{{ doctorDetails.date }}, {{ doctorDetails.year }} / {{ doctorDetails.time }}</view>
		  </view>
		</view>
		
		<view class="section-title">
			<text>Doctor's Diagnosis</text>
		</view>
		<view class="section">
		  <view class="details">
			<text>The viruses that cause flu spread at high levels during certain times of the year in the Northern and Southern hemispheres. These are called flu seasons. During times when flu is widespread, you may not need a flu test.</text>
		  </view>
		</view>

		<view class="section-title">
			<text>Doctor's Suggestion</text>
		</view>
		<view class="section">
		  <view class="details">
			<text>- Take a rest</text>
			<text>- Get disciplined with taking medicine on prescription</text>
		  </view>
		</view>
		
		<view class="section-title">
			<text>Prescription</text>
		</view>
		<view class="section">
		  <view class="title-details">
			<view class="imagebox">
				<image src="@/static/medi1.png" class="medicine-image"></image>
			</view>
			<div class="doc-details">
			  <view class="doctor-name">Antacids</view>
			  <view class="doctor-specialization">1 morning, 1 night (before food)</view>
			</div>      
		  </view>
		</view>
		<view class="section">
		  <view class="title-details">
			<view class="imagebox">
				<image src="@/static/medi2.png" class="medicine-image"></image>
			</view>
			<div class="doc-details">
			  <view class="doctor-name">Simetichone</view>
			  <view class="doctor-specialization">1 morning, 1 night (before food)</view>
			</div>      
		  </view>
		</view>
	  </view>
	  <button class="floating-button">
	    <image src="@/static/print.png" class="button-icon" />
	  </button>
  </view>
</template>

<script>
import { reactive } from "vue";
import slibrary from "@/slibrary/index.js";

export default {
  name: "PostConsultationPage",
  
  data() {
    return {
      doctorDetails: reactive({
        name: "",
        specialization: "",
        date: "",
        time: "",
        year: "",
        image: "",
        diagnosis: "",
        suggestions: "",
        prescriptions: "",
      }),
    };
  },

  methods: {
    handleItemClick(type) {
      switch (type) {
        case 1:
          slibrary.$router.go("/pages/telemedicine/consultHistory");
          break;
        default:
          console.warn("Unhandled item click type:", type);
      }
    },
  },

  onLoad(options) {
    console.log("Routed Data:", options);

    // Populate the reactive doctorDetails object
    this.doctorDetails.name = decodeURIComponent(options.name || "Unknown");
    this.doctorDetails.specialization = decodeURIComponent(
      options.specialization || "Unknown"
    );
    this.doctorDetails.date = decodeURIComponent(options.date || "No date provided");
    this.doctorDetails.time = decodeURIComponent(options.time || "No time");
    this.doctorDetails.year = decodeURIComponent(options.year || "2024");
    this.doctorDetails.image = decodeURIComponent(
      options.image || "/static/doctordemo.png"
    );
    this.doctorDetails.diagnosis = decodeURIComponent(
      options.diagnosis ||
        "Influenza (Flu) The viruses that cause flu spread at high levels during certain times of the year in the Northern and Southern hemispheres. These are called flu seasons. During times when flu is widespread, you may not need a flu test."
    );
    this.doctorDetails.suggestions = decodeURIComponent(
      options.suggestions ||
        "Take a rest. Get disciplined with taking medicine on prescription."
    );
    this.doctorDetails.prescriptions = decodeURIComponent(
      options.prescriptions || "no prescriptions"
    );
  },
};

</script>

<style>
.container {
  display: flex; /* Enable flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Full viewport height */
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.content {
  width: 60%; /* Set content width to 80% */
  max-width: 800px; /* Optional: limit the maximum width */
  background-color: #fff; /* Ensure it stands out from the container */
  padding: 20px; /* Add some padding for spacing */
  border: 1px solid #ccc; /* Border for visual separation */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
.header {
  height: 65px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-bottom: 2px solid #ccc; /* Add a bottom border */
  margin-bottom: 40px;
}

.textBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-right: 3px dotted #ccc; /* Add a dotted line */
}

.textBox:last-child {
  border-right: none; /* Remove border from the last item */
}

.label {
  font-size: 16px;
  color: #666;
}

.value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-right: 50px;
}
.page-title{
	text-align: center;
	margin-bottom: 12px;
}
.section {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.section-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #444;
  padding-bottom: 4px;
}
.details text {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
}
.details {
  padding-left: 12px;
}

.floating-button {
  position: fixed; /* Keeps the button fixed in place */
  bottom: 20px; /* Distance from the bottom of the viewport */
  right: 20px; /* Distance from the right of the viewport */
  width: 60px; /* Width of the button */
  height: 60px; /* Height of the button */
  border-radius: 50%; /* Makes the button circular */
  background-color: #007bff; /* Fallback background color */
  display: flex; /* Center content */
  justify-content: center; /* Center content */
  align-items: center; /* Center content */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow */
  border: none; /* Remove border */
  cursor: pointer; /* Pointer cursor on hover */
  z-index: 1000; /* Ensure it's above other elements */
}

.button-icon {
  width: 100%; /* Adjust the image size relative to the button */
  height: 50%;
  object-fit: contain; /* Ensure the image scales correctly */
}

.title-details {
  display: flex;
  /* justify-content: space-between; */
  align-items: center; /* Vertically align the image and text */
  width: 50%; /* Set the container width */
  gap: 20px; /* Add a consistent gap between elements */
}

.imagebox {
  flex-shrink: 0; /* Prevent the image from shrinking */
}

.doctor-image {
  width: 80px; /* Set the image swidth */
  height: 80px; /* Set the image height */
  object-fit: cover; /* Ensure the image covers the box without distortion */
}

.doc-details {
  display: flex;
  flex-direction: column; /* Stack name and specialization vertically */
}

.doctor-name {
  font-size: 16px; /* Adjust font size */
  font-weight: bold; /* Make the name bold */
  color: #333; /* Text color */
}

.doctor-specialization {
  font-size: 14px; /* Adjust font size */
  color: #666; /* Text color */
}

.doctor-time {
  font-size: 16px; /* Adjust the font size */
  font-weight: normal; /* Set font weight */
  color: #555; /* Adjust text color */
  margin-top: 5px; /* Optional: Add some spacing above */
}
.medicine-image{
	width: 50px; /* Set the image swidth */
	height: 50px; /* Set the image height */
	object-fit: cover; /* Ensure the image covers the box without distortion */
}

.top {
  display: flex; /* Arrange items horizontally */
  align-items: center; /* Vertically align the back button and title */
  padding: 0 20px; /* Add some horizontal padding */
  margin-bottom: 20px; /* Add spacing below the header */
}


.image-link {
  width: 70px; /* Set the size of the back button */
  height: 70px; /* Keep the width and height proportional */
  cursor: pointer; /* Show a pointer cursor on hover */
}

.page-title {
  flex-grow: 1; /* Allow the title to take up remaining space */
}

.title {
  font-size: 24px; /* Adjust font size for the title */
  font-weight: bold; /* Make the title bold */
  color: #333; /* Title color */
  text-align: left; /* Align the title to the left */
}
</style>