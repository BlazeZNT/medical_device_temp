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
				:class="[ 
					'date', 
					{
						selected: isSelected(date), 
						today: isToday(date), 
						past: isPastDate(date), 
						'empty-slot': !date.day, 
						green: !isSelected(date) && date.highlight // Ensure green is not applied to selected dates
					}
				]"
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
const emit = defineEmits(["update-date"]);

// Current date
const today = new Date();
const selectedDate = ref(null); // The date selected by the user
const currentDate = ref(new Date()); // Current date used for navigation

// Computed property for checking if the current month is being displayed
const isCurrentMonth = computed(() => {
  return (
    currentDate.value.getFullYear() === today.getFullYear() &&
    currentDate.value.getMonth() === today.getMonth()
  );
});

// Computed property for displaying month and date
const monthAndDate = computed(() => {
  const date = selectedDate.value
    ? new Date(selectedDate.value)
    : currentDate.value;
	
	const adjustedDate = new Date(date);
	adjustedDate.setDate(adjustedDate.getDate() + 1);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[adjustedDate.getMonth()];
  const day = adjustedDate.getDate();
  return `${day} ${month}`;
});



// Weekdays
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

// Store the highlighted green days
const greenDays = ref([]);

// Randomly select days to highlight
const randomizeGreenDays = () => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  // Get the remaining days of the month after today
  const startDay = today.getDate() + 1;
  const remainingDays = Array.from(
    { length: lastDateOfMonth - startDay + 1 },
    (_, i) => startDay + i
  );

  // Randomly select 3-5 days to highlight
  const randomCount = Math.min(5, remainingDays.length);
  greenDays.value = remainingDays
    .sort(() => Math.random() - 0.5)
    .slice(0, randomCount);
};

// Generate all dates for the current month (with blank spaces for alignment)
const dates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: "", fullDate: null, highlight: false });
  }

  for (let day = 1; day <= lastDateOfMonth; day++) {
    const fullDate = new Date(year, month, day).toISOString().split("T")[0];
    const isGreenDay = greenDays.value.includes(day);
    days.push({ day, fullDate, highlight: isGreenDay });
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
    currentDate.value.getMonth() + 1
  );
  updateCalendar();
};

// Update the calendar view based on the current date
const updateCalendar = () => {
  if (selectedDate.value) {
    const selected = new Date(selectedDate.value);
    if (selected.getMonth() !== currentDate.value.getMonth()) {
      selectedDate.value = null;
    }
  }
  randomizeGreenDays();
};

// Date selection
const selectDate = (date) => {
  if (date.fullDate) {
    selectedDate.value = date.fullDate;
    emit("update-date", monthAndDate.value);
  }
};

// Helper functions
const isSelected = (date) => date.fullDate === selectedDate.value;
const isToday = (date) =>
  date.fullDate === today.toISOString().split("T")[0];
const isPastDate = (date) =>
  date.fullDate && new Date(date.fullDate) < today;

randomizeGreenDays();
</script>

<style scoped>
/* Calendar Container Styling */
.calendar-container {
	width: auto;
	margin: auto;
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
	transition: color 0.3s ease;
	font-size: 16px;
	color: white; /* Default color */
	margin: auto;
}

.date.past {
	color: red; /* Make past days' text red */
}

.date.past.selected {
	color: red; /* Make past days' text red */
	background-color: transparent;
}

.date.today.selected {
	background-color: #58ffcf;
	color: black;
}

.date.selected {
	font-weight: bold;
	background-color: #58ffcf;
	color: black;
}

.date.today {
	border: 2px solid #58ffcf;
	color: white; /* Today's text remains white */
}

.date.empty-slot {
	visibility: hidden;
	pointer-events: none;
}

.date.green {
	background-color: green; /* Highlight color for green days */
	color: white;
	font-weight: bold;
}
</style>