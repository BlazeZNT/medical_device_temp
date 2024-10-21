<template>
  <div id="app">
    <Sidebar @menu-selected="handleMenuSelection" />
    <ResultsTable :selectedMenuItem="selectedMenuItem" />
  </div>
</template>

<script>
import Sidebar from '@/components/ReportSideNav/Sidebar.vue';
import ResultsTable from '@/components/ResultsTable/Table.vue';

export default {
  components: {
    Sidebar,
    ResultsTable,
  },
  data() {
    return {
      selectedMenuItem: { id: 4, name: 'Cardiac Care' },
    };
  },
  methods: {
    handleMenuSelection(item) {
      this.selectedMenuItem = item;
    },
  },
};
</script>

<style>
#app {
  width: 100%; /* Corrected from weight to width */
  display: flex;
  overflow: hidden; /* Changed from none to hidden */
  height: 100vh; /* Ensure it takes full height of the viewport */
  background-image: url('@/static/bgImage.png'); /* Move to CSS */
  background-size: cover; /* Cover to fill the entire area */
  background-repeat: no-repeat; /* Prevents repetition */
}

/* Add a specific height to Sidebar or ResultsTable if needed */
ResultsTable {
  flex: 1;
  max-width: 800px; /* Ensures it does not exceed this width */
}
</style>
