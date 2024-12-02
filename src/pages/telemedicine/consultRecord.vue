<template>
  <LayoutContent showBack @back="handleClickHome">
    <view class="pageView">
      <view class="pageView-title">Past Consultation</view>
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
				
				    <button class='recordBtn'>VIEW RECORD</button>
				  </view>
				</view>
				<view class="column">
						<view class="uni-title">Doctor's Diagnosis</view>
						<view class="uni-textarea">
						  <textarea 
							  v-model="state.diagnosis" 
							  auto-height 
							  class="textarea-grey-border">
						  </textarea>
						</view>
						
						<view class="uni-title">Doctors Suggestions</view>
						<view class="uni-textarea">
						  <textarea 
							  v-model="state.suggestions"
							  auto-height 
							  class="textarea-grey-border">
						  </textarea>
						</view>
					</view>
					<view class="column">
						<view class="uni-title">Prescriptions</view>
						<view class="prescriptionsbox">
						  <view class="prescriptionscontent">
							<image src="@/static/back.png" class="image-responsive"></image>
							<text class="image-text">Back to theasdf adslghalscnvlaoelkgnoasknbva</text>
						  </view>
						  <view class="prescriptionscontent">
							<image src="@/static/back.png" class="image-responsive"></image>
							<text class="image-text">Back asdfasdarhadcsvaweghascvsd</text>
						  </view>
						</view>
					</view>
					<view class="column">
					  <basicButton class="back">
						  BACK TO PAGE
					  </basicButton>
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
  diagnosis: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...askdfnasldfj'laskdjf;lakjgdlaa;lsdfkjasldfj;aslkdjv;lakj;olkrng.adfb;aldsncvaljehr;gojknclbjna;erojgbnal;ljcnvv;",
  suggestions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
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
  doctorDetails.name = options.name || "Unknown";
  doctorDetails.specialization = options.specialization || "Unknown";
  doctorDetails.date = options.date || "No date provided";
  doctorDetails.time = options.time || "No time";
  doctorDetails.year = options.year || "2024";
  doctorDetails.image = options.image || '/static/doctordemo.png';

  console.log("Parsed Doctor Details:", doctorDetails);
});

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/index");
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
}

.back{
	margin-top: 10px;
}
.prescriptionsbox {
  display: flex; /* Use flexbox layout */
  flex-wrap: wrap; /* Allow wrapping if items exceed container width */
  justify-content: space-between; /* Add spacing between boxes */
  width: 100%; /* Match the column width */
  max-width: 100%;
  box-sizing: border-box;
}

.prescriptionscontent {
  display: flex; /* Align image and text horizontally */
  align-items: center; /* Center align items vertically */
  // border: 2px solid grey;
  // padding: 10px;
  // margin: 10px; /* Add spacing between boxes */
  flex: 1 1 calc(45% - 20px); /* Allow 2 items per row with spacing */
  box-sizing: border-box;
}

.image-responsive {
  max-width: 50px;
  max-height: 50px;
  margin-right: 10px; /* Space between image and text */
}

.image-text {
  color: white;
  font-size: 14px;
  word-wrap: break-word; /* Wrap long text */
  flex: 1; /* Let the text take up remaining space */
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


</style>
