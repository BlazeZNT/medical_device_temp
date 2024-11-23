<template>
  <view class="calendar-container">
    <!-- Calendar Header -->
    <view class="calendar-header">
      <button v-if="!isCurrentMonth" @click="prevMonth" class="nav-button">&lt;</button>
      <view class="month-date">{{ monthAndDate }}</view>
      <button @click="nextMonth" class="nav-button">&gt;</button>
    </view>

    <!-- Weekday Labels -->
    <view class="calendar-weekdays">
      <view v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </view>
    </view>

    <!-- Calendar Dates -->
    <view class="calendar-dates">
      <view
        v-for="(date, index) in dates"
        :key="index"
        :class="['date', { selected: isSelected(date), today: isToday(date), 'empty-slot': !date.day }]"
        @click="selectDate(date)"
      >
        {{ date.day }}
      </view>
    </view>
  </view>
</template>


<script setup>
import { ref, computed } from "vue";

// Emits setup
const emit = defineEmits(['update-date']); // Define a custom event `update-date`

// Current date
const today = new Date();
const selectedDate = ref(null); // The date selected by the user
const currentDate = ref(new Date()); // Current date used for navigation

// Weekdays
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

// Check if the current view is the current month
const isCurrentMonth = computed(() => {
  return (
    currentDate.value.getFullYear() === today.getFullYear() &&
    currentDate.value.getMonth() === today.getMonth()
  );
});

// Generate the month and date for display
const monthAndDate = computed(() => {
  const date = selectedDate.value
    ? new Date(selectedDate.value) // Use the selected date
    : currentDate.value;           // Use the current date

  // Adjust the date
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + 1) 
  // Extract the month and day
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[adjustedDate.getMonth()];
  const day = adjustedDate.getDate();

  return `${day} ${month}`; // Format as "Month Day"
});

// Generate all dates for the current month (with blank spaces for alignment)
const dates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = (new Date(year, month, 1).getDay()); // Day of the week (0-6) for the 1st
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Last date of the month
  const days = [];

  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: "", fullDate: null }); // Empty slots
  }

  // Add actual days of the month
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const fullDate = new Date(year, month, day).toISOString().split("T")[0];
    days.push({ day, fullDate });
  }

  return days;
});

// Navigation: Go to the previous month
const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1
  );

  updateCalendar();
};

// Navigation: Go to the next month
const nextMonth = () => {
	  currentDate.value = new Date(
	  currentDate.value.getFullYear(),
	  currentDate.value.getMonth() + 1,
	  );


  updateCalendar();
};

// Update the calendar view based on the current date
const updateCalendar = () => {
  // If the selected date is not in the current month, clear the selection
  if (selectedDate.value) {
    const selected = new Date(selectedDate.value);
    if (selected.getMonth() !== currentDate.value.getMonth()) {
      selectedDate.value = null;
    }
  }
};

// Date selection
const selectDate = (date) => {
  if (date.fullDate) {
    selectedDate.value = date.fullDate; // Update the selected date
    emit('update-date', monthAndDate.value); // Send formatted value to parent
  }
};

// Helper functions
const isSelected = (date) => date.fullDate === selectedDate.value;
const isToday = (date) =>
  date.fullDate === today.toISOString().split("T")[0];
</script>

<style scoped>
/* Calendar Container Styling */
.calendar-container {
  width: auto;
  margin: auto;
  margin-bottom: 200px;
  padding: 20px;
  background: #1a1d21;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.month-date {
  font-size: 18px;
  font-weight: bold;
  color: #58ffcf;
}

.nav-button {
	background: #58ffcf;
	color: #1a1d21;
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
}


.calendar-weekdays {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #7f8c8d;
}

.weekday {
  flex: 1;
  text-align: center;
}

.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.date {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 16px;
  color: #ffffff;
  margin: auto;
}

.date.selected {
  background-color: #52f5d7;
  color: #1a1d21;
  font-weight: bold;
}

.date.today {
  border: 2px solid #58ffcf;
  color: #58ffcf;
}

.date.empty-slot {
  visibility: hidden; 
  pointer-events: none; 
}
</style>