<template>
  <ContentBox>
    <view style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
      <view style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        " v-if="!showHeapler">
        <div class="charsBox">
          <div class="charsItem" v-for="(item, index) in dataList" :key="index">
            <GaugePie :title="item.title" :subTitle="item.projectName" :value="item.value" :min="item.min"
                      :max="item.max" :unit="item.unit"></GaugePie>
          </div>
          <div class="charsItem charsItem2">
            <div class="charsItem" v-for="(item, index) in dataList2" :key="index">
              <GaugePie2 :title="item.title" :subTitle="item.projectName" :value="item.value"
                         :min="item.min" :max="item.max" :unit="item.unit"></GaugePie2>
            </div>
          </div>
        </div>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox img="../../static/health/healper/5.png" :tips="tips" @next="handleClickNext" v-if="showHeapler">
      </HelperBox>
    </view>
  </ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import {onMounted, ref} from "vue";
import BasicButton from "@/components/BasicButton/index.vue";
import GaugePie from "../Charts/GaugePie.vue";
import GaugePie2 from "../Charts/GaugePie2.vue";

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});
const tips = `1.Stand on the height measurement device.<br>2.Press the start button  on the device`;

const dataList = ref([{
  title: "PULSE",
  projectName: "pulse/min",
  value: 0,
  min: 0,
  max: 300,
  unit: "",
}, ]);

const dataList2 = ref([{
  title: "SYSTOLIC",
  projectName: "PRBPM",
  value: 0,
  min: 0,
  max: 300,
  unit: "mmHg",
},
  {
    title: "DIASTOLIC",
    projectName: "PRBPM",
    value: 0,
    min: 0,
    max: 300,
    unit: "mmHg",
  },
]);

const myChart = ref(null);

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
};

let timer = ref(null);
const chSerialPort = uni.requireNativePlugin('Leiye-UniSerialPort')

const list = ref([])

const openDevice = () => {
  const res = chSerialPort.chInit()
  if (res.code === 'success') {
    const devicesRes = chSerialPort.getUsbDevices()
    if (devicesRes.code === 'success') {
      list.value.device = devicesRes.data
      console.log(list.value.device);
    } else {
      uni.showToast({
        title: devicesRes.data
      })
    }
  } else {
    uni.showToast({
      title: res.data
    })
  }
}

const calculateCKS = (hexString) => {
  const data = hexString.match(/.{2}/g).map(byte => parseInt(byte, 16));
  const cks = data.reduce((cks, byte) => cks ^ byte, 0x00);
  return cks.toString(16).toUpperCase().padStart(2, '0');
}

const handleClickStart = () => {
  openDevice();

  const device = list.value.device[0]
  const devicesRes = chSerialPort.openDevice(device)

  const serialCount = chSerialPort.getSerialCount(device)

  const serialParameter = chSerialPort.setSerialParameter({
    'usbDevice': device,
    'serialCount': serialCount,
    'baudBean': {
      'baud': 115200,
      'data': 8,
      'stop': 1,
      'parity': 0
    }
  })

  chSerialPort.registerDataCallback(device, (data) => {
    console.log(data);
    // 设备连接成功
    if (data.hex === 'AA80030301010000') {
      // 发送测量指令
      const writeData = chSerialPort.writeData({
        'usbDevice': device,
        'serialCount': serialCount,
        'data': 'CC80030301020003'
      })
    }

    // 测量中
    if (data.hex.startsWith('AA8003040105')) {
      let pressureHigh = parseInt(data.hex.substr(12, 2), 16); // 取高字节 P[15:8]
      let pressureLow = parseInt(data.hex.substr(14, 2), 16) // 取低字节 P[7:0]

      // 输出压力值
      dataList2.value[0].value = (pressureHigh << 8) | pressureLow
    }

    // 测量结果
    if (data.hex.startsWith('AA80030F0106')) {
      const hexData = data.hex
      let systolic = parseInt(hexData.substr(26, 2), 16) * 256 + parseInt(hexData.substr(28, 2), 16);
      let diastolic = parseInt(hexData.substr(30, 2), 16) * 256 + parseInt(hexData.substr(32, 2), 16);
      let pulse = parseInt(hexData.substr(34, 2), 16) * 256 + parseInt(hexData.substr(36, 2), 16);
      dataList2.value[0].value = systolic
      dataList2.value[1].value = diastolic
      dataList.value[0].value = pulse
    }
  })

  // 发送连接设备指令
  const writeData = chSerialPort.writeData({
    'usbDevice': device,
    'serialCount': serialCount,
    'data': 'CC80030301010000'
  })

};

onMounted(() => {});

onUnmounted(() => {
  timer.value && clearInterval(timer.value);
});

function generateRandomNumber(min, max) {
  // 生成一个介于 min 和 max 之间的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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

.charsBox {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .charsItem {
    flex: 1;
    height: 100%;

    &.charsItem2 {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>