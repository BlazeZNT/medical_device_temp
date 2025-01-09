<template>
  <view class="eyePage">
    <view class="eyeContainer">
      <!-- Background Eye Image -->
      <image src="@/static/Eye/orangeeye.png" alt="Eye Background" class="eyeImage" />

      <!-- Updated Template -->
      <view class="circleButton centralButton">
        <span class="buttonText">CENTRAL</span>
      </view>
      <view class="circleButton temporalButton">
        <span class="buttonText">TEMPORAL</span>
      </view>
      <view class="circleButton superiorButton">
        <span class="buttonText">SUPERIOR</span>
      </view>
      <view class="circleButton nasalButton">
        <span class="buttonText">NASAL</span>
      </view>
      <view class="circleButton inferiorButton">
        <span class="buttonText">INFERIOR</span>
      </view>
    </view>


    <!-- Side Panel with Controls -->
	<view class="sideControls">
	  <view class="topicon">
		  <view class="iconControl">
			<image src="@/static/Eye/up.png" class="arrowImage" />
		  </view>
		  <view class="iconControl">
			<image src="@/static/Eye/down.png" class="arrowImage" />
		  </view>
	  </view>
	  <view class="bottomicon">
		  <view class="iconControl">
			<image src="@/static/Eye/target.png" class="iconImage" />
			<view class="controlLabel">Alignment</view>
		  </view>
		  <view class="iconControl">
			<image src="@/static/Eye/sun.png" class="iconImage" />
			<view class="controlLabel">Exposure</view>
		  </view>
	  </view>
	</view>

    <!-- Start Button -->
    <view class="startButton" @click="changestage">
      <text>START</text>
    </view>
  </view>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import { ref, reactive } from "vue";
import { defineEmits } from "vue";

// Define the event that this component will emit
const emit = defineEmits(["startButtonClicked"]);

const changestage = () => {
  console.log("OHio")
  emit("startButtonClicked"); // Emit the event
};

</script>



<style scoped>
.eyePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.eyeContainer {
  position: relative;
  width: 100%;
  height: 100%; /* Ensures the container takes full height */
  top: -100px; /* Move the container slightly upward */
}

.eyeImage {
  width: 100%;
  height: 650px; /* Adjusted to fit better with the upward movement */
  border-radius: 50%; /* Circular appearance */
  object-fit: cover; /* Ensures the image maintains its aspect ratio */
}



.circleButton {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(173, 216, 230, 0.3);  /* Semi-transparent background */
  border: 2px solid #58FFCF; /* Glow-like border */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-align: center;
}

/* Positioning of Buttons */
.centralButton {
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, #58FFCF, #5beaff);
}

.temporalButton {
  top: 65%;
  left: 28%;
  transform: translate(-50%, -50%);
}

.superiorButton {
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nasalButton {
  top: 65%;
  right: 28%;
  transform: translate(50%, -50%);
}

.inferiorButton {
  bottom: 2%;
  left: 50%;
  transform: translate(-50%, 50%);

}

/* Side Controls */
.sideControls {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 300px;
  justify-content: space-around;
}

.controlButton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconControl {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.iconImage {
  width: 35px; /* Increased to accommodate padding */
  height: 35px; /* Increased to accommodate padding */
  padding: 10px; /* Adds space inside the box */
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
}

.arrowImage {
  width: 32px;
  height: 28px;
  padding: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);

}

.controlLabel {
  color: white;
  font-size: 12px;
  text-align: center;
}

/* Start Button */
.startButton {
  position: absolute;
  bottom: 20px;
  background: white;
  color: black;
  padding: 10px 70px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.eyeContainer .circleButton {
  font-size: 14px; /* Smaller font size */
}


</style>

