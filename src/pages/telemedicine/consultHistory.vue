<template>
  <view class="page">
    <Header />

    <view class="content">
      <view class="content-border-box">
        <swiper class="swiper" :circular="true" :interval="3000" :autoplay="false" indicator-dots>
          <swiper-item v-for="(page, pageIndex) in pages" :key="pageIndex">
            <view class="leftback">
              <image src="@/static/back.png" class="image-link" @click="handleItemClick(1)"></image>
            </view>
            <view class="centertext">
              My Appointments
            </view>
            <view>
              <view class="rightback">
                <image src="./noti.png" class="image-link"></image>
              </view>
            </view>

            <view class="content-box" :class="{ 'fewer-items': page.length < 3 }">
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
            
				<button
				  class="status-btn"
				  @click="handleItemClick(5, doctor)"
				>
				  VIEW DETAIL
				</button>
            
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="appointment-button-container">
        <button class="appointment-button" @click="handleItemClick(2)">Book an Appointment</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Header from "@/components/Layout/Header.vue";
import slibrary from "@/slibrary/index.js";
import { getAppointments } from "@/utils/auth.ts"; // Import the API function



// Initialize the doctors array
const doctors = ref([]);
const pages = ref([]);
const showModal = ref(false);
const selectedDoctor = ref({ pageIndex: null, doctorIndex: null });



// API endpoint to fetch doctor data (replace with actual API URL)
const fetchDoctors = async () => {
  try {
    // Assuming your API returns an array of doctors
    const response = await getAppointments();
    const data = await response;

    // Assuming response contains the doctors list
    doctors.value = data.map(doctor => ({
      image: doctor.imageBase64 || '/static/doctordemo.png',
      name: doctor.name || 'Unknown',
      specialization: doctor.specialization || 'Unknown',
      date: doctor.date || 'No date provided',
      year: doctor.year || 'No year',
      time: doctor.time || 'No time',
      status: doctor.status || 'past',

    }));
    // Recalculate pages for pagination
    const itemsPerPage = 3;
    pages.value = [];
    for (let i = 0; i < doctors.value.length; i += itemsPerPage) {
      pages.value.push(doctors.value.slice(i, i + itemsPerPage));
    }
    
    console.log("Doctors Array:", doctors.value);
    console.log("Pages Array:", pages.value);

  } catch (error) {
    console.error("Error fetching doctors data:", error);
  }
};

// Fetch doctors data when component is mounted
onMounted(() => {
  fetchDoctors();
});

// Handle navigation based on the button type
const handleItemClick = (type, doctor = null) => {
  switch (type) {
    case 1:
      uni.navigateTo({
        url: "/pages/health/index",
      });
      break;
    case 2:
      uni.navigateTo({
        url: "/pages/telemedicine/appointmentList",
      });
      break;
    case 5:
      if (doctor) {
        // Construct query parameters
        const queryParams = Object.entries(doctor)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&");

        // Navigate to the detail page with doctor info
        uni.navigateTo({
          url: `/pages/telemedicine/consultRecord?${queryParams}`,
        });
      }
      break;
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
	
	// .default-btn {
	//   width: 100%;
	//   padding: 6rpx 0;
	//   display: inline-block;
	//   font-size: 14px;
	//   background: #fff;
	//   border-radius: 8px;
	//   font-family: FB;
	//   text-align: center;
	//   &.borderBtn {
	//     background: transparent;
	//     border: 1px solid #fff;
	//     color: #fff;
	//     font-family: FL;
	//   }
	
	.appointment-button-container{
		width: 80%;
		margin-top: 12px;
		align-self: center;
		text-align: center;
		button{
			width: 70%
		}
	}
	.appointment-button{
		font-size: 14px;
		font-family: FB;
	}

    .content-border-box {
      padding: 1px;
      width: 80%;
      align-self: center;
      height: 100%;
      margin-top: 0.2rem;
      overflow: hidden;
      background: linear-gradient(238deg, rgba(88, 255, 207, 1), rgba(27, 48, 42, 1));
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
	  
	  .image-link{
		  cursor: pointer;
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
        right: 1.5rem;
      }

      .centertext {
        position: absolute;
        top: 0.5rem;
        left: 6.6rem;
        color: white;
      }
	
	  .status-btn {
	    // padding: 8px 16px;
	    font-size: 0.3rem;
		// min-width: 156px;
	    border: none;
	    border-radius: 8px;
	    cursor: pointer;
	    font-weight: bold;
	    text-transform: uppercase;
	    transition: all 0.3s ease-in-out;
	  }
	  
	  .join-now-btn {
	    background-color: #ffffff;
	    color: #1f252c;
	    border: 1px solid #ffffff;
	  }
	  
	  .join-now-btn:hover {
	    background-color: #58ffcf;
	    color: #1f252c;
	    box-shadow: 0 0 10px rgba(88, 255, 207, 0.8);
	  }
	  
	  .reschedule-btn {
	    background-color: transparent;
	    color: #ffffff;
	    border: 1px solid #ffffff;
		margin-left: 10px;
	  }
	  
	  .reschedule-btn:hover {
	    background-color: rgba(255, 255, 255, 0.2);
	    color: #ffffff;
	    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
	  }
	  
	  .leftItems{
	    display: flex;
		align-items: center;
		padding-left: 0.2rem;
		// gap: 12px;
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

            .doctor-review {
              max-width: 0.8rem;
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
  background: linear-gradient(145deg, #1B262B, #29353D);
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
  color: #58FFCF;
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
