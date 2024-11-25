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
            
                <button class="status-btn" :class="{ 'join-now-btn': doctor.status === 'upcoming', 'reschedule-btn': doctor.status === 'past' }">
                  {{ doctor.status === 'upcoming' ? "JOIN NOW" : "RESCHEDULE" }}
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

// API endpoint to fetch doctor data (replace with actual API URL)
const fetchDoctors = async () => {
  try {
    // Assuming your API returns an array of doctors
    const response = await getAppointments();
    const data = await response.data;

    // Assuming response contains the doctors list
    doctors.value = data.map(doctor => ({
      image: doctor.imageBase64 || '/static/doctordemo.png',
      name: doctor.name || 'Unknown',
      specialization: doctor.specialization || 'Unknown',
      date: doctor.date || 'No date provided',
      year: doctor.year || 'No year',
      time: doctor.time || 'No time',
      status: doctor.status || 'upcoming',
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
const handleItemClick = (type) => {
  switch (type) {
    case 1:
      slibrary.$router.go("/pages/health/index");
      break;
    case 2:
      slibrary.$router.go("/pages/telemedicine/appointmentList");
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
	
	.appointment-button-container{
		width: 80%;
		margin-top: 12px;
		align-self: center;
		text-align: center;
		button{
			width: 70%
		}
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
	  }
	  	
	  .reschedule-btn:hover {
	    background-color: rgba(255, 255, 255, 0.2);
	    color: #ffffff;
	    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
	  }
	  	
	  .leftItems{
	    display: flex;
		align-items: center;
		padding-left: 1rem;
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
		  gap:0.5rem;
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
            margin-bottom: 8px;
          }

          .doc-details {
            display: flex;
            flex-direction: column;
			justify-content: center;
			align-items: center;
            text-overflow: ellipsis;
          }

          .doctor-name {
            font-size: 0.35rem;
            font-weight: bold;
            color: white;
          }

          .doctor-specialization {
            font-size: 0.3rem;
            color: #8a8a8a;
          }

          .doctor-date {
            font-size: 0.3rem;
            color: #8a8a8a;
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
        }
      }
    }
  }
  }
</style>
