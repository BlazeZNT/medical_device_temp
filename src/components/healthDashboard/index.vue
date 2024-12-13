<template>
  <div class="health-dashboard">
    <div class="card" v-for="item in healthItems" :key="item.id">
      <!-- Bind the src dynamically -->
      <image :src="item.icon" alt="Icon" class="icon" />
      <div class="griditem">
        <h3>{{ item.title }}</h3>
        <p :class="{ 'red-text': item.status === 'below-standard' }">{{ item.value }}</p>
        <span :class="`status ${item.status}`">{{ item.statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HealthDashboard",
  props: {
    healthItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.health-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 1vw; /* Dynamic gap between the cards */
  margin-bottom: 2vh; /* Adjust margin based on viewport height */
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5vw; /* Responsive border radius */
  box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.1);
  padding: 1vw; /* Responsive padding */
  display: flex;
  flex-direction: column; /* Stack content vertically */
  align-items: center;
  justify-content: center;
  font-size: 1vw; /* Adjust text size based on viewport width */
}

.icon {
  width: 5vw; /* Icon size adjusts based on viewport width */
  height: 5vw;
  border-radius: 50%;
  background: #f0f0f0;
  margin-bottom: 0.5vw;
}

.griditem {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center; /* Center items vertically */
  align-items: center;    /* Center items horizontally */
  text-align: center;     /* Ensure text is centered */
}

.griditem h3 {
  font-size: 1.2vw; /* Dynamic heading size */
  margin: 0 0 0.5vw;
  text-align: center;
}

.griditem p {
  font-size: 1.4vw; /* Dynamic paragraph size */
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.status {
  font-size: 0.9vw; /* Dynamic status size */
  padding: 0.2vw 0.5vw;
  border-radius: 0.3vw;
  margin-top: 0.5vw;
}

.status.normal {
  background: #e6f7ff;
  color: #007bff;
}

.status.below-standard {
  background: #ffe6e6;
  color: #ff4d4f;
}

.red-text {
  color: red; /* Red text for below-standard */
}
</style>	