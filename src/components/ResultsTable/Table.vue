<template>

  <view class="results-table">
      <view class="table-container">
        <table class="min-w-full table-auto border-collapse text-center">
          <thead>
            <tr>
              <th class="table-header">PARAMETER</th>
              <th class="table-header">CURRENT VALUE</th>
              <th class="table-header">STANDARD RANGE</th>
              <th class="table-header">RESULT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="result.parameter" :class="{ 'border-b-0': index === results.length - 1 }" class="border-b-gray-300">
              <td class="table-cell">{{ result.parameter }}</td>
              <td class="table-cell">{{ result.currentValue }}</td>
              <td class="table-cell">{{ result.standardRange }}</td>
              <td :class="[result.resultClass, 'table-cell']">{{ result.result }}</td>
            </tr>
          </tbody>
        </table>
      </view>
 
  </view>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';


const props = defineProps({
  selectedMenuItem: Object,
});

const results = ref([]);

watch(
  () => props.selectedMenuItem,
  (newValue) => {
    updateResults(newValue.id);
  },
  { immediate: true }
);

function updateResults(menuId) {
  if (menuId === 4) {
    results.value = [
      { parameter: 'TC', currentValue: '144 mg/dl', standardRange: '<200 mg/dl', result: 'Desirable', resultClass: 'bg-green-100 text-green-700' },
      { parameter: 'HDL', currentValue: '33 mg/dl', standardRange: '40 - 60 mg/dl', result: 'Low', resultClass: 'bg-blue-100 text-blue-700' },
      { parameter: 'TG', currentValue: '170 mg/dl', standardRange: '<150 mg/dl', result: 'High', resultClass: 'bg-red-100 text-red-700' },
      { parameter: 'LDL', currentValue: '77 mg/dl', standardRange: '<100 mg/dl', result: 'Optimal', resultClass: 'bg-green-100 text-green-700' },
      { parameter: 'TC-HDL', currentValue: '4.33 mg/dl', standardRange: '3.3 - 4.4 mg/dl', result: 'Normal', resultClass: 'bg-green-100 text-green-700' },
      { parameter: 'ECG 6 Lead', currentValue: 'NA', standardRange: 'NA', result: 'View Pdf', resultClass: 'text-blue-500 cursor-pointer' },
    ];
  }
}
</script>

<style scoped>
.results-table {
  @apply mt-4;
}

.table-container {
  @apply bg-white rounded-md shadow-md mx-12 px-1 py-1;
  max-height: 80vh; 
  overflow-y: auto;
}

table {
  @apply w-full;
}

.table-header {
  @apply p-1 font-semibold text-gray-800 border-b; 
  font-size: 0.2rem;
}

.table-cell {
  @apply px-2 py-1 text-gray-700;
  height:16rpx;
  margin-top: 1px;
  font-size: 0.3rem;
}

.border-b {
  border-bottom: 1px solid rgba(209, 213, 219, 1); 
}

.border-b-gray-300 {
  border-bottom: 1px solid;
  border-color: #D1D5DB; 
}

.bg-green-100 {
  background-color: #E6FFFA;
}

.text-green-700 {
  color: #2F855A;
}

.bg-blue-100 {
  background-color: #EBF8FF;
}

.text-blue-700 {
  color: #2B6CB0;
}

.bg-red-100 {
  background-color: #FED7D7;
}

.text-red-700 {
  color: #C53030;
}
</style>