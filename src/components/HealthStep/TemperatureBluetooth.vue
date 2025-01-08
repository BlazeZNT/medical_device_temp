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
				<view class="sitchBtn">
					<view class="sitchBtn-item" :class="kedu == 'KG' ? 'active' : ''" @click="handleClickKedu('KG')">°F
					</view>
					<view class="sitchBtn-item" :class="kedu == 'LBS' ? 'active' : ''" @click="handleClickKedu('LBS')">
						°C</view>
				</view>
				<view class="charts">
					<view style="width: 250rpx; height: 250rpx"><l-echart ref="chartRef"></l-echart></view>
				</view>
				<view class="btnsbox">
					<BasicButton @click="handleClickStart">START</BasicButton>
				</view>
			</view>
			<HelperBox img="../../static/health/healper/3.png" :tips="tips" @next="handleClickNext" v-if="showHeapler">
			</HelperBox>
		</view>
	</ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import * as echarts from "echarts";
import BasicButton from "@/components/BasicButton/index.vue";

const props = defineProps({
		initChange: Function,
		checkChange: Function,
		nextFun: Function,
	});


	const tips =
		`1.Place thermometer at the center of the<br /> forehead, just above the eyebrows. <br /> Ensure the sensor touches the skin lightly.<br>2.Press the start button  on the device`

	const kedu = ref("KG");

	const chartRef = ref(null);

	const weightValue = ref(0);

	var demoData = reactive({
		name: "TEMPERATURE",
		value: 0,
		pos: ["50%", "50%"],
	});

	const handleClickKedu = (val) => {
		kedu.value = val;
	};

  let device = null

  function searchDevices(){
    // that.pairedList = []; 	//已配对

    //取内存里面已配对的蓝牙
    // that.pairedList = uni.getStorageSync("pairedList");

    //打开蓝牙模块
    uni.openBluetoothAdapter({
      success(res) {
        console.log("蓝牙模块：",res);
        //获取本机蓝牙适配器状态
        uni.getBluetoothAdapterState({
          success: function(res) {
            console.log("蓝牙适配器状态：",res);
            if (res.available) {
              //开始搜寻附近的蓝牙外围设备
              uni.startBluetoothDevicesDiscovery({
                success(res) {
                  console.log("蓝牙设备：",res)
                  uni.onBluetoothDeviceFound((dev) => {
                    console.log(dev);
                    let bluetoothDeviceInfo = dev.devices.find((device) => device.name === 'HC-08');
                    if (bluetoothDeviceInfo) {
                      device = bluetoothDeviceInfo;
                      uni.createBLEConnection({
                        deviceId: device.deviceId,  // 替换为实际的设备 ID
                        success: (res) => {
                          console.log("连接成功", res);
                          // 连接成功后可以获取设备的服务和特征值
                          setTimeout(() => getBLEDeviceServices(), 1000); // 延迟1秒获取服务
                        },
                        fail: (error) => {
                          console.log("连接失败", error);
                          if (error.errCode === 10012) {
                            console.log('连接超时');
                          } else if (error.errCode === 10013) {
                            console.log('连接设备不匹配');
                          }
                        }
                      });
                      uni.stopBluetoothDevicesDiscovery({
                        success(res) {
                          console.log(res)
                        }
                      })
                    }
                  })
                }
              })
            }
          },
        })
      }
    })
  }

  let serviceId = null;

  const getBLEDeviceServices = () => {
    console.log(device)
    uni.getBLEDeviceServices({
      deviceId: device.deviceId,
      success: (res) => {
        console.log('成功获取蓝牙设备的所有服务', res);
        serviceId = res.services[res.services.length-2].uuid;  // 获取主要服务
        console.log(serviceId)
        getBLEDeviceCharacteristics();
      },
      fail: (error) => {
        console.log('获取蓝牙设备的服务失败', error);
      }
    });
  }

	onMounted(() => {
    searchDevices();
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

  let readCharacteristic = null;

  const getBLEDeviceCharacteristics = () => {
    uni.getBLEDeviceCharacteristics({
      deviceId: device.deviceId,
      serviceId: serviceId,
      success: (res) => {
        console.log('获取 characteristic 成功', res);
        const characteristics = res.characteristics;
        readCharacteristic = characteristics.find(c => c.properties.notify).uuid;  // 找到读特征值
        console.log("characteristic: " + readCharacteristic)
        startNotify();
      },
      fail: (error) => {
        console.log('获取 characteristic 失败', error);
      }
    })
  }

	const handleClickStart = () => {
		// weightValue.value = Math.floor(Math.random() * 50);
		// startDynamicUpdate();
	};

  const ab2hex = (buffer) => {
    const hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function(bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('')
  }


  // 解析温度数据函数
  function hexToAscii(hex) {
    let asciiStr = '';
    // 每两个字符作为一个十六进制字节进行转换
    for (let i = 0; i < hex.length; i += 2) {
      let hexPair = hex.slice(i, i + 2);  // 获取两个字符的十六进制对
      let char = String.fromCharCode(parseInt(hexPair, 16));  // 十六进制转为字符
      asciiStr += char;  // 追加到结果字符串
    }
    return asciiStr;
  }

  const startNotify = () => {
    uni.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: device.deviceId,
      serviceId: serviceId,
      characteristicId: readCharacteristic,
      success: (res) => {
        console.log("开启 notify 功能成功", res);
        uni.onBLECharacteristicValueChange((res) => {
          let resHex = ab2hex(res.value);
          console.log("接收到回传内容：", resHex);

          // 导航码是5e，表示开始的数据包
          if (!resHex.startsWith('5e')) {  // 导航码检查
            return
          }

          // 记忆数据部分（第2、3字节）
          let memoryData = resHex.slice(2, 6);
          console.log("记忆数据：", memoryData === '3030' ? '00' : '01');

          // 状态码部分（第4字节）
          let statusCode = resHex.slice(6, 8);
          console.log("状态码：", statusCode);

          // 根据状态码判断具体数据
          if (statusCode === '30') {  // 体温数据
            console.log("回传体温数据");

            //   异常数据
            if (resHex.length === 18) {
              // 获取体温数据部分
              let temperatureData = resHex.slice(8, 16);  // 假设温度数据是从第8到第16字节
              // 提示重新测量
              if (temperatureData === '54624c6f') {
                console.log("体温低于34°C (TbLo)");
              } else if (temperatureData === '54624869'){
                console.log("体温高于42.9°C (TbHi)");
              }
            }

            if (resHex.length === 22) {
              let unit = resHex.slice(18, 20);
              if (unit === '43') {
                //   摄氏度
                const temperatureData = resHex.slice(10, 18);
                let temperatureValue = hexToAscii(temperatureData);
                console.log(`实际体温：${temperatureValue}°C`);
                weightValue.value = parseFloat(temperatureValue);
                startDynamicUpdate()
              } else {
                //   华摄氏
                const temperatureData = resHex.slice(10, 18);
                let temperatureValue = hexToAscii(temperatureData);
                console.log(`实际体温：${temperatureValue}F`);
                weightValue.value = parseFloat(temperatureValue);
                startDynamicUpdate()
              }
            }
          }
          // this.handleResponse(resHex);
        });
      },
      fail: (error) => {
        console.log("监听失败", error);
      }
    });
  }

	let interval = null; // 定时器
	// 开始动态更新数据
	const startDynamicUpdate = (num) => {
    demoData.value = weightValue.value;
    updateChartData()
	};

  // 更新图表数据
	const updateChartData = () => {
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
					max: 50,
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
					max: 50,
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
							fontSize: 60,
							color: "#fff",
						},
						formatter: ["{value}"].join("\n") + '°F',

						rich: {
							name: {
								fontSize: 20,
								lineHeight: 10,
								color: "#ddd",
								padding: [30, 0, 0, 0],
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
					max: 50,
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