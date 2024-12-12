<template>
  <view class="container">
    <view class="box">
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
          <image src="@/static/back.png" class="image-link" @click="handleBackClick" />
        </view>
        <view class="page-title">
          <text class="title">Post Consultation</text>
        </view>
      </view>
      <view class="section">
        <view class="title-details">
          <view class="imagebox">
            <image :src="`data:image/jpeg;base64,${doctorDetails.image}`" class="doctor-image" />
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
            <image src="@/static/medi1.png" class="medicine-image" />
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
            <image src="@/static/medi2.png" class="medicine-image" />
          </view>
          <div class="doc-details">
            <view class="doctor-name">Simetichone</view>
            <view class="doctor-specialization">1 morning, 1 night (before food)</view>
          </div>
        </view>
      </view>
	  <HealthDashboard :healthItems="healthData" />
    </view>
	<!-- Floating button -->
	<div class="floating-button">+</div>
    <button class="floating-button" @click="openModal">
      <image src="@/static/print.png" class="button-icon" />
    </button>
	<view v-if="showModal" class="modal-overlay">
	  <view class="modal">
		<view class="modal-header">Print Confirmation</view>
		<view class="modal-body">
		  Are you sure you want to print this page?
		</view>
		<view class="modal-footer">
		  <button class="modal-btn cancel" @click="confirmPrint">Yes</button>
		  <button class="modal-btn close" @click="closeModal">No</button>
		</view>
	  </view>
	</view>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import HealthDashboard from "@/components/HealthDashboard/index.vue"; // Import the component

const doctorDetails = reactive({
  name: "",
  specialization: "",
  date: "",
  time: "",
  year: "",
  image: "",
});

const healthData = [
  { id: 1, icon: "/static/view.png", title: "RIGHT | LEFT EYE", value: "6/36 | 6/36", status: "below-standard", statusText: "Below Standard" },
  { id: 2, icon: "/static/blood.png", title: "BLOOD PRESSURE", value: "133/82 mmHg", status: "normal", statusText: "Normal" },
  { id: 3, icon: "/static/knee.png", title: "BONE MASS", value: "2.84 kg", status: "normal", statusText: "Normal" },
  { id: 4, icon: "/static/heart.png", title: "HEART RATE", value: "99 bpm", status: "normal", statusText: "Normal" },
  { id: 5, icon: "/static/cholesterol.png", title: "CHOLESTEROL", value: "2.84 kg", status: "normal", statusText: "Normal" },
  { id: 6, icon: "/static/blood.png", title: "HEMOGLOBIN", value: "99 bpm", status: "normal", statusText: "Normal" },
];

// Modal logic
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const confirmPrint = () => {
  showModal.value = false; // Hide the modal
  setTimeout(() => {
    window.print(); // Trigger the print dialog
  }, 100); // Small delay to ensure modal is hidden before printing
};

const handleBackClick = () => {
  uni.navigateTo({
    url: "/pages/telemedicine/consultHistory",
  });
};

onLoad((options) => {
  console.log("Routed Data:", options);

  // Populate the reactive doctorDetails object
  doctorDetails.name = decodeURIComponent(options.name || "Unknown");
  doctorDetails.specialization = decodeURIComponent(options.specialization || "Unknown");
  doctorDetails.date = decodeURIComponent(options.date || "No date provided");
  doctorDetails.time = decodeURIComponent(options.time || "No time");
  doctorDetails.year = decodeURIComponent(options.year || "2024");
  doctorDetails.image = decodeURIComponent(options.image || "/static/doctordemo.png");
});
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.box {
  width: 60%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 40px;
}

.textBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-right: 3px dotted #ccc;
}

.textBox:last-child {
  border-right: none;
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

.page-title {
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
  font-size: 13px;
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  z-index: 1000;
}

.button-icon {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

.title-details {
  display: flex;
  align-items: center;
  width: 50%;
  gap: 20px;
}

.imagebox {
  flex-shrink: 0;
}

.doctor-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.doc-details {
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.doctor-specialization {
  font-size: 14px;
  color: #666;
}

.doctor-time {
  font-size: 16px;
  font-weight: normal;
  color: #555;
  margin-top: 5px;
}

.medicine-image {
  width: 50px;
  height: 50px;
  object-fit: cover;

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

.floating-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
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
  background: linear-gradient(145deg, #1b262b, #29353d);
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
  color: #58ffcf;
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
</style>