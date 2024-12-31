<template>
	<ContentBox>
		<view style="display: flex; flex-direction: column; align-items: center">
			<view style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        " v-if="!showHeapler">
				<view class="charts">
					<view style="width: 250rpx; height: 250rpx"><l-echart ref="chartRef"></l-echart></view>
				</view>
				<view class="btnsbox">
					<BasicButton @click="handleClickStart">START</BasicButton>
				</view>
			</view>
			<HelperBox img="../../static/health/healper/8.png" :tips="tips" @next="handleClickNext" v-if="showHeapler">
			</HelperBox>
		</view>
	</ContentBox>
</template>

<script setup>
	import ContentBox from "@/components/HealthStep/ContentBox.vue";
	import HelperBox from "./HelperBox.vue";
	import {
		onMounted,
		ref,
		nextTick,
		reactive,
		onBeforeUnmount
	} from "vue";
	import * as echarts from "echarts";
	import BasicButton from "@/components/BasicButton/index.vue";

	const props = defineProps({
		initChange: Function,
		checkChange: Function,
		nextFun: Function,
	});


	const tips =
		`1.Plut the device on your arms.<br /> 2.Press the start button  on the device.`

	const kedu = ref("KG");

	const chartRef = ref(null);

	const weightValue = ref(0);

	var demoData = reactive({
		name: "BLOOD SUGAR",
		value: 0,
		level: "",
		pos: ["50%", "50%"],
	});

	const handleClickKedu = (val) => {
		kedu.value = val;
	};

	onMounted(() => {
		// 组件能被调用必须是组件的节点已经被渲染到页面上
	});

	const myChart = ref(null);

	const showHeapler = ref(true);
	const handleClickNext = () => {
		showHeapler.value = false;
		setTimeout(async () => {
			if (!chartRef.value) return;
			myChart.value = await chartRef.value.init(echarts);
			myChart.value.setOption(option.value);
		}, 300);
	};
	const handleClickStart = () => {
		weightValue.value = Math.min(Math.floor(Math.random() * 250), 250);
		startDynamicUpdate();
	};

	let interval = null; // 定时器
	// 开始动态更新数据
	const startDynamicUpdate = () => {
	    interval = setInterval(() => {
	        demoData.value += 5; // Adjust increment for smoother updates
	        if (demoData.value > weightValue.value) {
	            clearInterval(interval);
	        }
	        updateChartData();
	    }, 50); // Match the working example
	};
	
	// Update the level (high, normal, low) in demoData.level
	const updateLevel = () => {
	    if (demoData.value < 60) {
	        demoData.level = "low";
	    } else if (demoData.value >= 60 && demoData.value < 140) {
	        demoData.level = "normal";
	    } else {
	        demoData.level = "high";
	    }
	};
	
	const updateChartData = () => {
	    demoData.value = Math.min(demoData.value, 250); // Clamp to 250
	    myChart.value.setOption(option.value);
	};

	// 在组件卸载前清理定时器
	onBeforeUnmount(() => {
		if (interval) {
			clearInterval(interval); // 清理定时器
		}
		if (myChart.value) {
			myChart.value.dispose()
		}
	});
	const option = computed(() => {
		return {
			series: [
				// 外侧光线
				{
					name: demoData.name,
					type: "gauge",
					center: demoData.pos,
					roundCap: true,
					radius: "90%",
					startAngle: 205,
					endAngle: -25,
					min: 0,
					max: 250,
					axisLine: {
						show: true,
						lineStyle: {
							width: 10,
							color: [
								[
									1,
									new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
											offset: 0,
											color: "rgba(6, 255, 184, 1)",
										},
										{
											offset: 0.5,
											color: "rgba(91, 234, 255, 1)",
										},
										{
											offset: 1,
											color: "rgba(237, 171, 51, 1)",
										},
									]),
								],
							],
						},
					},
					axisTick: {
						show: 0,
					},
					splitLine: {
						show: 0,
					},
					axisLabel: {
						show: 0,
					},
					pointer: {
						show: 0,
					},
					detail: {
						show: 0,
					},
				},
				// 内侧指针、数值显示
				{
					name: demoData.name,
					type: "gauge",
					center: demoData.pos,
					radius: "87%",
					startAngle: 205,
					endAngle: -25,
					min: 0,
					max: 250,
					axisLine: {
						show: true,
						lineStyle: {
							width: 30,
							color: [
								[
									1,
									new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
											offset: 0,
											color: "rgba(6, 255, 184, 0.20)",
										},
										{
											offset: 0.5,
											color: "rgba(91, 234, 255, 0.20)",
										},
										{
											offset: 1,
											color: "rgba(237, 171, 51, 0.20)",
										},
									]),
								],
							],
						},
					},
					axisTick: {
						show: 0,
					},
					splitLine: {
						show: 0,
					},
					axisLabel: {
						show: 0,
					},
					pointer: {
						icon: "image:https://img.picgo.net/2024/11/10/1f2b876bd31ce6c6d.png",
						length: 120,
						width: 12,
						offsetCenter: [0, "-45%"],
						itemStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: "rgba(255,255,255,0.5)",
									},
									{
										offset: 0.7,
										color: "rgba(255,255,255,0.2)",
									},
									{
										offset: 1,
										color: "rgba(255,255,255,0)",
									},
								],
								// global: false // 缺省为 false
							}
						},
					},
					title: {
						show: true,
						offsetCenter: [0, "-40%"],
						color: "rgba(6, 255, 184, 1)",
						fontSize: 24,
						fontFamily: "Courier New",
						borderRadius: 21,
						padding: 5,
					},
					detail: {
						show: true,
						offsetCenter: [0, "0"],
						textStyle: {
							fontSize: 30, // Font size for the main number
							color: "#fff",
						},
						formatter: (params) => {
							// Determine dynamic text and color based on the value
							let dynamicText = "";
							let colorKey = ""; // Key for dynamic text color style
							if (params < 60) {
								dynamicText = "Low";
								colorKey = "low"; // Use 'low' style
							} else if (params >= 60 && params < 140) {
								dynamicText = "Normal";
								colorKey = "normal"; // Use 'normal' style
							} else {
								dynamicText = "High";
								colorKey = "high"; // Use 'high' style
							}

							// Combine value, unit, and dynamic text with a space or newline
							return `{value|${params}}   {unit|Mg/DL}\n{${colorKey}|${dynamicText}}`;
						},
						rich: {
							value: {
								fontSize: 40, // Larger font for the number
								color: "#fff",
							},
							unit: {
								fontSize: 15, // Smaller font for the unit
								color: "#aaa",
							},
							low: {
								fontSize: 25, // Font size for 'Low' level
								color: "#05ffb7", // Green for low level
							},
							normal: {
								fontSize: 25, // Font size for 'Normal' level
								color: "#5beaff", // Yellow for normal level
							},
							high: {
								fontSize: 25, // Font size for 'High' level
								color: "#edab33", // Red for high level
							},
						},
					},
					itemStyle: {
						normal: {
							color: "#FFED8B",
							borderWidth: 20,
						},
					},
					data: [{
						value: demoData.value,
						name: demoData.name,
					}, ],
				},
				{
					name: "刻度文字",
					type: "gauge",
					radius: "100%",
					startAngle: 208, //刻度起始
					endAngle: -28, //刻度结束
					min: 0,
					max: 250,
					splitNumber: 1,
					z: 4,
					axisTick: {
						show: false,
					},
					splitLine: {
						length: 0, //刻度节点线长度
						lineStyle: {
							width: 5,
							color: "#018DFF",
						}, //刻度节点线
					},
					axisLabel: {
						color: "#f5f5f5",
						fontSize: 14,
						padding: 15,
					}, //刻度节点文字颜色
					pointer: {
						show: false,
					},
					axisLine: {
						lineStyle: {
							opacity: 0,
						},
					},
					detail: {
						show: false,
					},
					data: [{
						value: 0,
						name: "",
					}, ],
				},
			],
		};
	});
</script>


<style lang="scss" scoped>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		flex-direction: column;

		.num {
			color: #fff;
			font-size: 24rpx;
			margin-bottom: 20rpx;
		}
	}

	.modelbtn {
		width: 160rpx;
		height: 40rpx;
		color: #fff;
		background: #56ccf2;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}

	.btnsbox {
		width: 155.21rpx;
	}

	.sitchBtn {
		width: 91.15rpx;
		height: 25rpx;
		background: #303a45;
		border-radius: 3rpx 3rpx 3rpx 3rpx;
		padding: 3rpx 4rpx;
		display: flex;
		overflow: hidden;
		margin-bottom: 20rpx;

		.sitchBtn-item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			border-radius: 3rpx 3rpx 3rpx 3rpx;
			font-family: FB;
			font-weight: 800;
			font-size: 8rpx;
			color: #fff;
			line-height: 10rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;

			&.active {
				background: #12ffbb;
				color: #000;
			}
		}
	}
</style>