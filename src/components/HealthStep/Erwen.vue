<template>
	<ContentBox image="../../static/step/3.png">
		<view class="charts-box">
			<qiun-data-charts type="gauge" :opts="opts" :chartData="chartData" />
		</view>
	</ContentBox>
</template>

<script>
	import ContentBox from './ContentBox.vue'
	
	export default {
		components: {
			ContentBox
		},
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['gauge'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					padding: [0, 0, 0, 0],
					title: {
						name: "36℃",
						fontSize: 25,
						color: "#2fc25b",
						offsetY: 50
					},
					subtitle: {
						name: "",
						fontSize: 15,
						color: "#fff",
						offsetY: -50
					},
					extra: {
						gauge: {
							type: "default",
							width: 30,
							labelColor: "#fff",
							startAngle: 1,
							endAngle: 0,
							startNumber: 35,
							endNumber: 40,
							labelFormat: "",
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: 30,
								color: "#FFFFFF",
								childNumber: 5,
								childWidth: 12
							},
							pointer: {
								width: 24,
								color: "auto"
							}
						}
					}
				}
			};
		},
		mounted() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: [{
							"value": 0.3,
							"color": "#2fc25b"
						}, {
							"value": 0.6,
							"color": "#1890ff"
						}, {
							"value": 1,
							"color": "#f04864"
						}],
						series: [{
							name: "完成率",
							data: 0.3
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>


<style lang="scss" scoped>
	.functional {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;

		.btn {
			padding: 10rpx;
			background: green;
			color: #fff;
			border-radius: 10rpx;
		}
	}

	.charts-box {
		width: 300rpx;
		height: 300rpx;
		background: rgba(#3b82f6, 0.8);
		border-radius: 15rpx;
		overflow: hidden;
		padding: 20rpx;
	}
</style>