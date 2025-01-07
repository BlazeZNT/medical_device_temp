<template>
  <ContentBox>
    <view style="display: flex; flex-direction: column; align-items: center">
      <view v-if="!showHeapler">
        <view class="allcontainer">
          <scroll-view class="scroll-container" scroll-y>
            <view
              class="data-container"
              v-for="(test, index) in testData"
              :key="index"
            >
              <!-- Range Container -->
              <view class="range-container">
                <view class="title">{{ test.name }}</view>
                <view class="value-display">
                  <view>
                    <text class="value">{{ test.value }}</text>
                    <text class="unit"> {{ test.unit }} </text>
                  </view>
                  <view
                    class="status"
                    :class="getStatusClass(test.value, test.thresholds)"
                  >
                    {{ getStatus(test.value, test.thresholds) }}
                  </view>
                </view>
                <view class="range-bar">
                  <view
                    class="indicator"
                    :style="{
                      width: getIndicatorWidth(test.value, test.thresholds.max) + '%',
                      background: 'linear-gradient(to right, rgba(6, 255, 184, 1) 0%, rgba(91, 234, 255, 1) 50%, rgba(60,111,255, 1)  100%)',
                    }"
                  ></view>
                  <view class="range-endpoint start">{{ test.thresholds.low }}</view>
                  <view class="range-endpoint high">{{ test.thresholds.high }}</view>
                </view>
              </view>
              <view class="dataset">
                <view class="result-text">
                  <text class="main-text">
                    Your {{ test.name.toLowerCase() }} test result has been returned to
                    {{ getStatus(test.value, test.thresholds).toLowerCase() }}. This means that your
                    {{ test.name.toLowerCase() }} has been returned to the
                    {{ getStatus(test.value, test.thresholds).toLowerCase() }} range.
                  </text>
                </view>

                <v-divider class="my-4"></v-divider>

                <view class="recommendation-group">
                  <img src="/static/star.png" class="icon" />
                  <view class="recommendation-title">Recommendations</view>
                </view>
                <view class="recommendations">
                  <view class="recommendation-list">
                    <text
                      v-for="(recommendation, rIndex) in test.recommendations"
                      :key="rIndex"
                      class="recommendation-item"
                    >
                      • {{ recommendation }}
                    </text>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <HelperBox
        @next="handleClickNext"
        img="../../static/health/healper/9.png"
        tips="1.Place the device on your arm.<br /> 2.Press the start button on the device."
        v-if="showHeapler"
      ></HelperBox>
    </view>
  </ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { ref, reactive } from "vue";

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
};

// Test data array
const testData = reactive([
  {
    name: "Total Cholesterol",
    value: 4.5,
    unit: " Mmol/L",
    thresholds: { low: 0, normal: 3.0, high: 5.0, max: 6.0 },
    recommendations: ["Regular blood monitoring", "dietary Sodium"],
  },
  {
    name: "TRIGLYCERIDE",
    value: 120,
    unit: " Mmol/L",
    thresholds: { low: 0, normal: 60, high: 120, max: 130 },
    recommendations: ["Regular blood monitoring", "dietary Sodium"],
  },
  {
    name: "HDL Cholesterol",
    value: 4.5,
    unit: " Mmol/L",
    thresholds: { low: 0, normal: 2.5 , high: 5, max: 5.5 },
    recommendations: ["Regular blood monitoring", "dietary Sodium"],
  },
  {
    name: "HDL % OF TOTAL CHOLESTEROL",
    value: 40,
    unit: " %",
    thresholds: { low: 0, normal: 30, high: 60, max: 70 },
    recommendations: ["Regular blood monitoring", "dietary Sodium"],
  },
  {
    name: "LDL",
    value: 4.5,
    unit: " Mmol/L",
    thresholds: { low: 0, normal: 2.5, high: 5, max: 6.0 },
    recommendations: ["Regular blood monitoring", "dietary Sodium"],
  },
]);

// Methods to calculate status and indicator width
const getStatus = (value, thresholds) => {
  if (value < thresholds.normal) return "Low";
  if (value <= thresholds.high) return "Normal";
  return "High";
};

const getStatusClass = (value, thresholds) => {
  if (value < thresholds.normal) return "status-low";
  if (value <= thresholds.high) return "status-normal";
  return "status-high";
};

const getIndicatorWidth = (value, max) => {
  const percentage = (value / max) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};
</script>

<style scoped>
.data-container {
  display: flex;
  flex-direction: row; /* Arrange range and dataset side by side */
  background-color: #1f252c;
  border-radius: 5px;
  color: white;
  width: 90%;
  margin: auto;
  border: 1px solid rgba(0, 128, 0, 0.1);
  margin-bottom: 30px;

  
}

.range-container {
  flex: 0.8; /* Adjust this value as needed */
}

.dataset {
  flex: 1.2; /* Adjust this value as needed */
}

.range-container {
  background-color: #232B33;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 18px;
  color: #12FFBB;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

.value-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.value {
  font-size: 30px;
  font-weight: bold;
}

.unit {
  font-size: 20px;
}

.status {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-low {
  background-color: #ff6f61;
  color: white;
}

.status-normal {
  background-color: #5BEAFF;
  color: white;
}

.status-high {
  background-color: #ffa500;
  color: white;
}

.range-bar {
  position: relative;
  width: 100%;
  height: 8px;
  background: #444;
  border-radius: 4px;
  /* overflow: hidden; */
  margin-bottom: 30px; /* Adjust this value if necessary */
}

.indicator {
  position: absolute;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    rgba(6, 255, 184, 1) 0%,
    rgba(91, 234, 255, 1) 50%,
    rgba(60,111,255, 1) 100%
  ); /* Gradient color */
  width: 0; /* Start with 0 width and dynamically adjust it */
}

.range-endpoint {
  position: absolute;
  top: 20px; /* Adjust this value as needed */
  font-size: 12px;
  color: #ccc;
}

.start {
  left: 0; /* Align to the start of the bar */
}

.middle {
  left: 40%; /* Center alignment */
  transform: translateX(-50%);
  color: #00f2ff; /* Highlighted color for 'Normal' */
}

.end {
  right: 0; /* Align to the end of the bar */
}

.dataset {
  background-color: #20282F;
  font-size: 14px;
  border-left: 1px solid rgba(0, 128, 0, 0.1);
  padding: 20px;
  
}

.result-text {
  margin-bottom: 15px;
}

.main-text {
  color: #e8e8e8;
  line-height: 1.5;
  font-size: 14px;
}

.recommendation-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-top: 1px solid rgba(58, 207, 240, 0.2);
  padding-top: 15px;
}

.icon {
  width: 16px;
  height: 16px;
  background-color: #00f2ff;
  border-radius: 50%;
  margin-right: 10px;
}

.recommendation-title {
  font-size: 16px;
  color: #00f2ff;
  font-weight: bold;
}

.recommendations {
  margin-top: 10px;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.recommendation-item {
  font-size: 14px;
  color: white;
}

.icon{
  width: 20px;
  height: 20px;
}

.range-endpoint.high {
  left: 80%; /* Position based on 'high' relative to 'max' */
  top: 20px;
  font-size: 12px;
  color: #ccc;
}

.range-endpoint.end {
  right: 0;
  top: 20px;
  font-size: 12px;
  color: #ccc;
}

.scroll-container {
  max-height: 400px; /* Set the max height for the scrollable area */
  width: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 10px;
  box-sizing: border-box;
}
</style>