<template>
  <view class="page">
    <Header />

    <view class="content">
      <view class="content-border-box">
		  
        <swiper class="swiper" :circular="true" :interval="3000" :autoplay="false" indicator-dots>
          <swiper-item v-for="(page, pageIndex) in pages" :key="pageIndex">

				<view class="leftback" >
					<image src="@/static/back.png" @click="handleItemClick(1)"></image>
				</view>
				<view class="centertext">
					Book an Appointment
				</view>
				<view>
					<view class="rightback" >
						<image src="./noti.png" ></image>
					</view>
				</view>

			
            <view class="content-box">
              <view v-for="(doctor, idx) in page" :key="idx" class="doctor-card" @click="handleDoctorClick(doctor)">
                <image :src="doctor.image" class="doctor-image" />
                <view class="doctor-info">
                  <div class="doc-details">
                    <view class="doctor-name">{{ doctor.name }}</view>
                    <view class="doctor-specialization">{{ doctor.specialization }}</view>
                  </div>
                  <view class="doctor-review">
                    <span class="star">⭐</span> {{ doctor.review }}
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import Header from "@/components/Layout/Header.vue";
import slibrary from "@/slibrary/index.js";

// Example data (to be replaced with API calls)
const doctors = [
  { image: '/static/doctordemo.png', name: "Dr. Robert Lee", specialization: "Dermatologist", review: 4.5 },
  { image: "/static/doctor2.png", name: "Dr. Richardson Jones", specialization: "Dermatologist", review: 4.5 },
  { image: "/static/doctor3.png", name: "Dr. Prasnan Meni", specialization: "Family Medicine", review: 4.5 },
  { image: "/static/doctor4.png", name: "Dr. Dhanang Prast", specialization: "Neurologist", review: 4.5 },
  { image: "/static/doctor5.png", name: "Dr. Adnan Satya", specialization: "Surgeon", review: 4.5 },
  { image: "/static/doctor6.png", name: "Dr. Erlon Murz", specialization: "Cardiologist", review: 4.5 },
  { image: "/static/doctor5.png", name: "Dr. Adnan Satya", specialization: "Surgeon", review: 4.5 },
  { image: "/static/doctor6.png", name: "Dr. Erlon Murz", specialization: "Cardiologist", review: 4.5 },
  { image: "/static/doctor3.png", name: "Dr. Prasnan Meni", specialization: "Family Medicine", review: 4.5 },
  { image: "/static/doctor4.png", name: "Dr. Dhanang Prast", specialization: "Neurologist", review: 4.5 },
  { image: "/static/doctor5.png", name: "Dr. Adnan Satya", specialization: "Surgeon", review: 4.5 },
  
];

const itemsPerPage = 6;
const pages = [];
for (let i = 0; i < doctors.length; i += itemsPerPage) {
  pages.push(doctors.slice(i, i + itemsPerPage));
}

const handleItemClick = (type) => {
			switch (type) {
				case 1:
					console.log("it is")
					slibrary.$router.go("/pages/health/index");
					break;
					
				}
}
const handleDoctorClick = (doctor) => {
  console.log("Doctor Information:", {
    name: doctor.name,
    specialization: doctor.specialization,
  });

  // Navigate to the completeAppointment page with query parameters
	uni.navigateTo({
	  url: `/pages/telemedicine/makeAppointment?name=${encodeURIComponent(doctor.name)}&specialization=${encodeURIComponent(doctor.specialization)}&image=${encodeURIComponent(doctor.image)}`,
	});
};

</script>

<style lang="scss" scoped>
		.leftCardTitle {
		  flex-shrink: 0;
		  padding: 15rpx;
		  display: flex;
		  align-items: center;
		  color: #fff;
		  font-size: 11rpx;
		  color: #ffffff;
		  line-height: 14rpx;
		
		  .line {
		    margin: 0 6rpx;
		    color: #58ffcf;
		  } 
		}
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
	

    .content-border-box {
      padding: 1px;
      width: 80%;
      align-self: center;
      height: 100%;
      margin-top: 0.2rem;
      overflow: hidden;
      background: linear-gradient(
        238deg,
        rgba(88, 255, 207, 1),
        rgba(27, 48, 42, 1)
      );
      border-radius: 24px;

      .swiper {
        width: 100%;
        height: 100%;
      }
	  
	  .leftback,
	  .rightback {
	  	position: absolute;
	  	

	  
	  	image {
	  		width: 100%;
	  		height: 100%;
	  	}
	  }
	  
	  .leftback {
		top: 0.1rem;
		width: 1.3rem;
		height: 1.3rem;  
	  	left: 1.3rem;
	  }
	  
	  .rightback {
	    top: 0.4rem;
		width: 0.8rem;
		height: 0.8rem;
	  	right: 1.8rem;
	  }
	  
	  .centertext{
		position: absolute;
		top: 0.5rem;
		left: 6rem;
		color: white;

	  }

      .content-box {
        width: 100%;
		height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
		
        gap: 16px;
        padding: 1.5rem;
        background: linear-gradient(
          181deg,
          rgba(35, 42, 49, 1) 0%,
          rgba(27, 32, 40, 1) 100%
        );
        border-radius: 24px;

        .doctor-card {
          width: 48%;
		  height: 2.2rem;
          display: flex;
          // justify-content: space-around;
          align-items: center;
          background: #232a31;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          .doctor-image {
            width: 60px;
            height: 60px;
            border-radius: 20%;
            object-fit: cover;
			margin-left: 15px;
          }
		  
		  .doc-details{
			  display: flex;
			  flex-direction: column;
			  text-overflow: ellipsis;
			  justify-content: center;
			  align-items: baseline;
			  margin-right: 20px;
			  width: 3rem;
			  margin-left: 15px;
	
		  }
		  // .doctor-name {
		  //   max-width: 3rem;
		  //   font-weight: bold;
		  //   margin-bottom: 4px;
		  //   display:flex;
		  //   font-size: 0.3rem;
		  //   text-align: left;
		  //   margin-bottom: 4px;
		  // }
		  // .doctor-specialization {
		  //   color: #a0a0a0;
		  //   margin-bottom: 4px;
		  //   text-align: left;
		  //   font-size: 0.2rem;
		  // }

          .doctor-info {
		    display: flex;
			min-width: 3rem;
            color: #fff;
			// gap: 8rpx;

            .doctor-name {
              font-weight: bold;
              margin-bottom: 4px;
			  font-size: 0.3rem;
            }

            .doctor-specialization {
              color: #a0a0a0;
              margin-bottom: 4px;
			  font-size: 0.25rem;
            }

            .doctor-review {
			  max-width: 1rem;
              color: white;
			  flex-shrink: 0; /* Prevent shrinking of the review */

            }
			.doctor-review .star {
			  color: #58ffcf; /* Color of the star */
			}
          }
        }
      }
    }
  }
}
</style>
