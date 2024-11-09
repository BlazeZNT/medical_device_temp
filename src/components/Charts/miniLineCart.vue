<template>
  <view class="charts">
    <view style="width: 100%; height: 100%"
      ><l-echart ref="chartRef"></l-echart
    ></view>
  </view>
</template>
  
  <script setup>
import {
  onMounted,
  ref,
  nextTick,
  reactive,
  onBeforeUnmount,
  watch,
} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "",
  },
  subTitle: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
});

const myChart = ref(null);
const chartRef = ref(null);

// watch(
//   () => props.value,
//   () => {
//     setTimeout(async () => {
//       myChart.value && myChart.value.setOption(option.value);
//     }, 300);
//   }
// );

// 初始数据
var data = [300];
var xAxisData = [1]; // 初始 X 轴数据
var maxPoints = 20; // 显示的最大数据点数

onMounted(() => {
  setTimeout(async () => {
    if (!chartRef.value) return;
    myChart.value = await chartRef.value.init(echarts);
    myChart.value.setOption(option.value);
  }, 300);
});

onBeforeUnmount( () => {
	if(myChart.value) {
		myChart.value.dispose()
	}
})

function updateData() {
  // 新增数据（这里是随机数作为示例，可以替换为实际数据）
  var newData = Math.round(Math.random() * 500);
  data.push(newData);
  xAxisData.push(xAxisData.length + 1);

  // 仅保留最近 maxPoints 个数据点
  if (data.length > maxPoints) {
    data.shift();
    xAxisData.shift();
  }

  // 更新图表
  myChart.value.setOption({
    xAxis: {
      data: xAxisData,
    },
    series: [
      {
        data: data,
      },
    ],
  });
}

setInterval(updateData, 1000);

const option = computed(() => {
  return {
    title: {
      text: props.title,
      left: "5%",
      top: "9%",
      textStyle: {
        fontSize: 12,
        color: "#06FFB8",
      },
    },
    grid: {
      left: 80,
      top: 30,
      right: 20,
      bottom: 30,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        color: "#aaa",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      max: 500,
      axisLabel: {
        color: "#aaa",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#444", // 设置分割线颜色
        },
      },
    },
    series: [
      {
        name: "Data",
        type: "line",
        smooth: false,
        data: data,
        lineStyle: {
          width: 2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#06FFB8" }, // 起始颜色
              { offset: 1, color: "#2B3348" }, // 结束颜色
            ],
          },
        },
        symbol: "none",
      },
    ],
  };
});
</script>
  
  <style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>