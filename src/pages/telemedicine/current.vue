<template>
  <view class="page">
    <Header />
    <view class="content">
      <view v-if=" doctors.length>0 " class="content-border-box">
        <!-- Check if `hello` is true -->
		<swiper class="swiper" :circular="true" :interval="3000" :autoplay="false" indicator-dots>
		  <swiper-item v-for="(page, pageIndex) in pages" :key="pageIndex">
			<view class="leftback">
			  <image src="@/static/back.png" class="image-link" @click="handleItemClick(1)" />
			</view>
			<view class="centertext">My Appointments</view>
			<view>
			  <view class="rightback">
				<image src="./noti.png" class="image-link" @click="handleItemClick(5)" />
			  </view>
			</view>
			<view class="content-box " :class="{ 'fewer-items': page.length < 3 }">
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
				  :class="{ 'reschedule-btn': doctor.status === 'past' }"
				  v-if="doctor.status === 'past'"
				  @click="handleReschedule(doctor)"
				>
				  RESCHEDULE
				</button>
				<button class="status-btn" @click="openModal(pageIndex, idx)">CANCEL</button>
			  </view>
			</view>
		  </swiper-item>
		</swiper>
        <!-- Fallback content if `hello` is false -->
      </view>
	  <view v-else class="newStructure">
		  <view class="topic">
			  <view class="leftback">
				<image src="@/static/back.png" class="image-link" @click="handleItemClick(1)" />
			  </view>
			  <view class="centertext">My Appointments</view>
			  <view>
				<view class="rightback">
				<image src="./noti.png" class="image-link noti" @click="handleItemClick(5)" />
				</view>
			  </view>
		  </view>
		  <view>
			  <image src="@/static/Frame.png" class="image-link" />
		  </view>
		  <view class="appText">
		  		You don't have any Appointment 
		  </view>
	  </view>
      <view class="appointment-button-container">
        <button class="appointment-button" @click="handleItemClick(2)">BOOK AN APPOINTMENT</button>
      </view>
    </view>

    <!-- Modal -->
    <view v-if="showModal" class="modal-overlay">
      <view class="modal">
        <view class="modal-header">Confirm Cancellation</view>
        <view class="modal-body">
          Are you sure you want to cancel this appointment?
        </view>
        <view class="modal-footer">
          <button class="modal-btn cancel" @click="confirmCancel">Yes</button>
          <button class="modal-btn close" @click="closeModal">No</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from "@/components/Layout/Header.vue";
import slibrary from "@/slibrary/index.js";
import { getAppointments, cancelAppointment } from "@/utils/auth.ts"; // Import the API function
import { useAppStore } from '@/stores/app'; // Import the store

// Initialize the doctors array
const doctors = ref([]);
const pages = ref([]);
const showModal = ref(false);
const selectedDoctor = ref({ pageIndex: null, doctorIndex: null });
const hello = ref(false);
const count = ref(0);
// API endpoint to fetch doctor data (replace with actual API URL)
const fetchDoctors = async () => {
  try {
    // Assuming your API returns an array of doctors
    const response = await getAppointments();
    const data = await response;

    // Assuming response contains the doctors list
    doctors.value = data.map(doctor => ({
      id: decodeURIComponent(doctor.id),
      image: decodeURIComponent(doctor.imageBase64 || '/static/doctordemo.png'),
      name: decodeURIComponent(doctor.name || 'Unknown'),
      specialization: decodeURIComponent(doctor.specialization || 'Unknown'),
      date: decodeURIComponent(doctor.date || 'No date provided'),
      year: decodeURIComponent(doctor.year || 'No year'),
      time: decodeURIComponent(doctor.time || 'No time'),
      status: decodeURIComponent(doctor.status || 'past'),
    }));
		count.value = doctors.value.length
		console.log("this is count",count.value)
	// console.log(hello.value)
    // Recalculate pages for pagination
    const itemsPerPage = 3;
    pages.value = [];
    for (let i = 0; i < doctors.value.length; i += itemsPerPage) {
      pages.value.push(doctors.value.slice(i, i + itemsPerPage));
    }
	// console.log(pages.value.length)
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
      slibrary.$router.go("/pages/telemedicine/choicePage");
      break;
    case 2:
      slibrary.$router.go("/pages/telemedicine/appointmentList");
      break;
    case 3:
      slibrary.$router.go("/pages/telemedicine/videoCall");
      break;
    case 4:
      slibrary.$router.go("/pages/telemedicine/makeAppointment");
      break;
	case 5:
	  slibrary.$router.go("/pages/telemedicine/notifications");
	  break;
	  
  }
};

// Handle button click for joining video call or rescheduling
const handleButtonClick = (doctor) => {
  if (doctor.status === 'upcoming') {
    gotoVideoCall();
  } else if (doctor.status === 'past') {
    handleReschedule(doctor);
  }
};

const gotoVideoCall = () => {
  slibrary.$router.go("/pages/telemedicine/videocall");
}

// Function to navigate to reschedule flow
const handleReschedule = (doctor) => {
  const sourcePage = "current"; // Change this to the actual source page name if needed
  const query = Object.entries({ ...doctor, sourcePage })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  slibrary.$router.go(`/pages/telemedicine/makeAppointment?${query}`);
};

// Function to remove the doctor from the array and cancel the appointment
const removeDoctor = async (pageIndex, doctorIndex) => {
  const doctorToRemove = pages.value[pageIndex][doctorIndex];
  const actualIndex = doctors.value.findIndex(
    (doctor) => doctor.id === doctorToRemove.id
  );

  if (actualIndex !== -1) {
    // Remove the doctor from the doctors array
    doctors.value.splice(actualIndex, 1);
  }

  // Remove the doctor from the pages array
  pages.value[pageIndex].splice(doctorIndex, 1);
    // Recalculate pages for pagination
    const itemsPerPage = 3;
    pages.value = [];
    for (let i = 0; i < doctors.value.length; i += itemsPerPage) {
      pages.value.push(doctors.value.slice(i, i + itemsPerPage)); 
  }
  
  // Make the API call to cancel the appointment
  try {
    await cancelAppointment(doctorToRemove.id);
    console.log(`Appointment with doctor ${doctorToRemove.name} cancelled successfully.`);
  } catch (error) {
    console.error("Error cancelling appointment:", error);
  }
};

// Open the modal to confirm cancellation
const openModal = (pageIndex, doctorIndex) => {
  selectedDoctor.value = { pageIndex, doctorIndex };
  showModal.value = true;
};

// Close the modal without taking action
const closeModal = () => {
  showModal.value = false;
};

// Confirm the cancellation and remove the doctor
const confirmCancel = () => {

	const appStore = useAppStore(); // Access the store
	const { pageIndex, doctorIndex } = selectedDoctor.value;

	// Get the doctor details before removing
	const removedDoctor = pages.value[pageIndex][doctorIndex];

	// Add the notification to the store
	appStore.addNotification({
	id: removedDoctor.id,
	name: removedDoctor.name,
	date: decodeURIComponent(removedDoctor.date || 'No date provided'),
	year: decodeURIComponent(removedDoctor.year || 'No year'),
	time: decodeURIComponent(removedDoctor.time || 'No time'),
	image: decodeURIComponent(removedDoctor.image || 'No time'),
	
	message: `Appointment at ${removedDoctor.date} ${removedDoctor.year} ${removedDoctor.time} with Dr. ${removedDoctor.name} was canceled.`,
	source: "cancel"
	
	});

	// Remove the doctor and close the modal
	removeDoctor(pageIndex, doctorIndex);
	count.value -= 1;
	console.log("This is count: ", count.value)
	closeModal();


	// Navigate to the notifications page
	// slibrary.$router.go('/pages/telemedicine/notifications');	8410
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
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
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
		margin-left: 5px;
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

h4{
	color: white;
	margin-bottom: 10px;
	margin-top: 10px;
}

.notification-message{
	color: white;
	font-size: 14px;
}

.currenttime {
  font-size: 12px;         
  color: rgba(255, 255, 255, 0.6); 
}

.newStructure {
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Ensure elements are in a horizontal row */
  align-items: center; /* Vertically align items */
  justify-content: space-evenly; /* Distribute space between items */
  padding: 10px; /* Add some padding for spacing */
  width: 80%;
  align-items: center;
  align-self: center;
  
  .topic{
	  display: flex; /* Use flexbox for layout */
	  flex-direction: row; /* Ensure elements are in a horizontal row */
	  align-items: center; /* Vertically align items */
	  justify-content: space-evenly; /* Distribute space between items */
	  width: 100%;
	  align-items: center;
	  align-self: center;
  }

  .leftback,
  .rightback {
    display: flex; /* Flexbox for aligning the image */
    align-items: center; /* Vertically center the image */
  }

  .centertext {
    flex: 1; /* Take remaining space */
    text-align: center; /* Center text horizontally */
    font-size: 0.375rem; /* Adjust font size */
    color: white; /* Change color if needed */
  }

  .image-link {
    width: 80px; /* Adjust size of the image */
    height: 80px; /* Adjust size of the image */
    cursor: pointer; /* Add a pointer cursor for clickable images */
  }
  
  .noti{
	  width: 55px; /* Adjust size of the image */
	  height: 55px; /* Adjust size of the image */
	  margin-left: 20px;
  }

  & + .content-box {
    margin-top: 20px; /* Add margin to the content below */
    display: block; /* Ensure content goes to the next line */
  }
  .appText{
	  color: white;
	  margin-top: 20px;
	  margin-bottom: 20px;
  }
}

</style>
