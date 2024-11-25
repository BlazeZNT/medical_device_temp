<template>
  <view class="page">
    <Header />

    <view class="content">
      <view class="content-border-box">
        <view class="swiper">
          <view v-for="(page, pageIndex) in pages" :key="pageIndex">
            <view class="content-box" :class="{ 'fewer-items': page.length < 3 }">
              <view class="tickBox">
                <view class="leftback">
                  <image src="@/static/Tick.png" class="image-link"></image>
                </view>
                <view class="centertext">Your appointment has been made!</view>
              </view>
              <view v-for="(doctor, idx) in page" :key="idx" class="doctor-card">
                <div class="leftItems">
				<image :src="'data:image/jpeg;base64,' + doctor.image" class="doctor-image" />
                  <view class="doctor-info">
                    <div class="doc-details">
                      <view class="doctor-name">{{ doctor.name }}</view>
                      <view class="doctor-specialization">{{ doctor.specialization }}</view>
                    </div>
                  </view>
                </div>
                <view class="doctor-info">
                  <div class="doc-details">
                    <view class="day-time">Date & Time</view>
                    <view class="doctor-date">{{ `${doctor.date} ${doctor.year} ${doctor.time} ` }}</view>
                  </div>
                </view>
              </view>
              <view class="appointment-button-container" @click="navigateToCurrent">
                <BasicButton>OKAY</BasicButton>
              </view>
            </view>
          </view>
        </view>
		
      </view>
	  
    </view>
  </view>
</template>

<script setup>
	
	import Header from "@/components/Layout/Header.vue";
	import slibrary from "@/slibrary/index.js";
	import BasicButton from "@/components/BasicButton/index.vue";

	// Example data (to be replaced with API calls)
	const doctors = ref([]);
	const pages = ref([]);
	  // { image: "./doctordemo.png", name: "Dr. Robert Lee", specialization: "Dermatologist", date: "7 December 2024, 10:00am", status: "upcoming"},

	// ];
	onLoad((options) => {
	  console.log("Routed Data:", options);
	
	  // Populate doctors
	  doctors.value.push({
	    name: decodeURIComponent(options.name || "Unknown"),
	    specialization: decodeURIComponent(options.specialization || "Unknown"),
	    date: decodeURIComponent(options.date || "No date provided"),
	    time: decodeURIComponent(options.time || "No time"),
		year: decodeURIComponent(options.year || "No time"),
		image: decodeURIComponent(options.image || '/static/doctordemo.png')
	  });
	
	  // Recalculate pages
	  pages.value = [];
	  const itemsPerPage = 3;
	  for (let i = 0; i < doctors.value.length; i += itemsPerPage) {
	    pages.value.push(doctors.value.slice(i, i + itemsPerPage));
	  }
	
	  console.log("Pages Array:", pages.value);
	});
	
	const navigateToCurrent = () => {
	  if (doctors.value.length > 0) {
	    const doctor = doctors.value[0];
		// console.log("Testing : " ,doctor.name,doctor.specialization,doctor.date,doctor.time)
	    uni.navigateTo({
	      url: `/pages/telemedicine/current?name=${encodeURIComponent(doctor.name)}&specialization=${encodeURIComponent(doctor.specialization)}&date=${encodeURIComponent(doctor.date)}&time=${encodeURIComponent(doctor.time)}&year=${encodeURIComponent(doctor.year)}&image=${encodeURIComponent(doctor.image)}`,
	    });
	  }
	};


</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-image: url("@/static/bgImage.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #1f252c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    padding-top: 0;
	
	.appointment-button-container{
		width: 100%;
		margin-top: 30px;
		align-self: center;
		text-align: center;
		button{
			width: 99%
		}
	}

    .content-border-box {
		padding: 1px;
		width: 60%;
		align-self: center;
		margin-top: 0.2rem;
		overflow: hidden;
		background: linear-gradient(238deg, rgba(88, 255, 207, 1), rgba(27, 48, 42, 1));
		border-radius: 24px;

      .swiper {
        width: 100%;
        height: 100%;
      }


      .centertext {
        color: white;
      }
	  .image-link{
		width: 50px;
		height: 50px;
	  }
	
	  .status-btn {
	    padding: 8px 16px;
	    font-size: 0.3rem;
		min-width: 156px;
	    border: none;
	    border-radius: 8px;
	    cursor: pointer;
	    font-weight: bold;
	    text-transform: uppercase;
	    transition: all 0.3s ease-in-out;
	  }
	  
	  .reschedule-btn {
	    background-color: transparent;
	    color: #ffffff;
	    border: 1px solid #ffffff;
	  }
	  
	  .reschedule-btn:hover {
	    background-color: rgba(255, 255, 255, 0.2);
	    color: #ffffff;
	    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
	  }
	  
		  
	  .tickBox{
		  display: flex;
		  flex-direction: column;
		  gap: 15px;
		  align-items: center;
		  margin-bottom: 20px;
	  }
	  .leftItems{
	    display: flex;
		align-items: center;
		padding-left: 0.5rem;
		gap: 12px;
	  }

      .content-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        gap: 16px;
        padding: 1.5rem;
        background: linear-gradient(181deg, rgba(35, 42, 49, 1) 0%, rgba(27, 32, 40, 1) 100%);
        border-radius: 24px;

        &.fewer-items {
          justify-content: center;
        }

        .doctor-card {
          width: 100%;
          height: 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #232a31;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          .doctor-image {
            width: 70px;
            height: 70px;
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
			  font-size: 0.2rem;
            }
			
			.doctor-date{
				font-size: 0.2rem;
				text-transform: uppercase;
			}

            .doctor-review {
              max-width: 1rem;
              min-height: 1.7rem;
              color: #10e2f5;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}
</style>


