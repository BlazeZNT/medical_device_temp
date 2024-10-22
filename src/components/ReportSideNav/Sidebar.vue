<template>
  <div class="sidebar">
    <ul>
      <li 
        v-for="item in menuItems" 
        :key="item.id" 
        @click="selectMenuItem(item)" 
        :class="{ active: selectedItem.id === item.id }">
        {{ item.name }}
      </li>
    </ul>
    
    <div class="button-group">
      <button class="sidebar-btn download-btn" @click="onDownload">Download</button>
      <button class="sidebar-btn view-btn" @click="onView">View</button>
      <button class="sidebar-btn share-btn" @click="onShare">Share</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, name: 'General Health Checkup' },
        { id: 2, name: 'Diabetic Care' },
        { id: 3, name: 'Anemia' },
        { id: 4, name: 'Cardiac Care' },
        { id: 5, name: 'Lung Care' },
        { id: 6, name: 'Stethoscope' },
        { id: 7, name: 'Vision Test' },
        { id: 8, name: 'Hearing Test' },
      ],
      selectedItem: {},
    };
  },
  methods: {
    selectMenuItem(item) {
      this.selectedItem = item;
      this.$emit('menu-selected', item);
    },
    onDownload() {
      // alert('Download clicked');
    },
    onView() {
      // alert('View clicked');
    },
    onShare() {
      // alert('Share clicked');
    }
  },
};
</script>

<style scoped>
.sidebar {
  margin: 0;
  padding-bottom: 20rpx; 
  width: 30%;
  background-color: #ffffff;
  height: 100%;
  border-right: 1px solid #ccc;

}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 16rpx;
  cursor: pointer;
  font-size: 8rpx;
  color: #3D4EAC;
  border-bottom: 0.5px solid gray;
}

.sidebar li:hover, .sidebar li.active {
  background-color: #DFE3FD;
}

.button-group {
  margin-top: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-btn {
  width: 160rpx;
  padding: 0;
  margin: 5px 0;
  border: none;
  background-color: #3D4EAC;
  color: white;
  font-size: 8rpx;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}

.download-btn {
  background-color: #979797; 
}

.view-btn {
  background-color: #979797; 
}


.share-btn {
  background-color: #4880FF; 
}


</style>
