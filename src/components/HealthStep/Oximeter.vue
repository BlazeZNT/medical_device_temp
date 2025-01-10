<template>
  <ContentBox>
    <view
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <view
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
        v-if="!showHeapler"
      >
        <div class="charsBox">
          <div class="charsItem" v-for="(item, index) in dataList" :key="index">
            <GaugePie
              :title="item.title"
              :subTitle="item.projectName"
              :value="item.value"
              :min="item.min"
              :max="item.max"
              :unit="item.unit"
            ></GaugePie>
          </div>
        </div>
        <!-- <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view> -->
      </view>
      <HelperBox  img="../../static/health/healper/4.png" :tips="tips" @next="handleClickNext" v-if="showHeapler"></HelperBox>
    </view>
  </ContentBox>
</template>
	
	<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import BasicButton from "@/components/BasicButton/index.vue";
import GaugePie from "../Charts/GaugePie.vue";
import {onHide, onShow} from "@dcloudio/uni-app";

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});
const tips = `1.Place your index finger into the<br> oximeter’s clip with the sensor.<br>2.Press the start button  on the device`

const dataList = ref([
  {
    title: "OXYGEN",
    projectName: "SPO2",
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  {
    title: "PULSE",
    projectName: "PRBPM",
    value: 0,
    min: 0,
    max: 500,
    unit: "bpm",
  },
])

const myChart = ref(null);

const emit = defineEmits(['callback'])

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;

  setTimeout(() => {
    emit('callback', { name: 'SPO2', value: dataList.value[0].value + '%' })
    emit('callback', { name: 'PRBPM', value: dataList.value[1].value + ' pulse/min' })
    oximeterModule.closeDevice();
  }, 8000)
};

// CRC-8 查找表
const crc_table = [
  0x00,0x5e,0xbc,0xe2,0x61,0x3f,0xdd,0x83,0xc2,0x9c,0x7e,0x20,0xa3,0xfd,0x1f,0x41,
  0x9d,0xc3,0x21,0x7f,0xfc,0xa2,0x40,0x1e,0x5f,0x01,0xe3,0xbd,0x3e,0x60,0x82,0xdc,
  0x23,0x7d,0x9f,0xc1,0x42,0x1c,0xfe,0xa0,0xe1,0xbf,0x5d,0x03,0x80,0xde,0x3c,0x62,
  0xbe,0xe0,0x02,0x5c,0xdf,0x81,0x63,0x3d,0x7c,0x22,0xc0,0x9e,0x1d,0x43,0xa1,0xff,
  0x46,0x18,0xfa,0xa4,0x27,0x79,0x9b,0xc5,0x84,0xda,0x38,0x66,0xe5,0xbb,0x59,0x07,
  0xdb,0x85,0x67,0x39,0xba,0xe4,0x06,0x58,0x19,0x47,0xa5,0xfb,0x78,0x26,0xc4,0x9a,
  0x65,0x3b,0xd9,0x87,0x04,0x5a,0xb8,0xe6,0xa7,0xf9,0x1b,0x45,0xc6,0x98,0x7a,0x24,
  0xf8,0xa6,0x44,0x1a,0x99,0xc7,0x25,0x7b,0x3a,0x64,0x86,0xd8,0x5b,0x05,0xe7,0xb9,
  0x8c,0xd2,0x30,0x6e,0xed,0xb3,0x51,0x0f,0x4e,0x10,0xf2,0xac,0x2f,0x71,0x93,0xcd,
  0x11,0x4f,0xad,0xf3,0x70,0x2e,0xcc,0x92,0xd3,0x8d,0x6f,0x31,0xb2,0xec,0x0e,0x50,
  0xaf,0xf1,0x13,0x4d,0xce,0x90,0x72,0x2c,0x6d,0x33,0xd1,0x8f,0x0c,0x52,0xb0,0xee,
  0x32,0x6c,0x8e,0xd0,0x53,0x0d,0xef,0xb1,0xf0,0xae,0x4c,0x12,0x91,0xcf,0x2d,0x73,
  0xca,0x94,0x76,0x28,0xab,0xf5,0x17,0x49,0x08,0x56,0xb4,0xea,0x69,0x37,0xd5,0x8b,
  0x57,0x09,0xeb,0xb5,0x36,0x68,0x8a,0xd4,0x95,0xcb,0x29,0x77,0xf4,0xaa,0x48,0x16,
  0xe9,0xb7,0x55,0x0b,0x88,0xd6,0x34,0x6a,0x2b,0x75,0x97,0xc9,0x4a,0x14,0xf6,0xa8,
  0x74,0x2a,0xc8,0x96,0x15,0x4b,0xa9,0xf7,0xb6,0xe8,0x0a,0x54,0xd7,0x89,0x6b,0x35
];

// 缓存数据
let buffer = "";

// 处理接收到的数据
function handleReceivedData(hexData) {
  buffer += hexData;

  while (buffer.length >= 4) {
    const startIndex = buffer.indexOf("AA55");
    if (startIndex === -1) {
      buffer = "";
      break;
    }

    if (startIndex > 0) buffer = buffer.slice(startIndex);

    if (buffer.length < 8) break;

    const length = parseInt(buffer.slice(6, 8), 16);
    const fullPacketLength = (4 + length) * 2;

    if (buffer.length < fullPacketLength) break;

    const fullPacket = buffer.slice(0, fullPacketLength);
    buffer = buffer.slice(fullPacketLength);

    const parsedData = parseOximeterData(fullPacket);
    console.log("解析结果：", parsedData);
    if (parsedData.command === 83) {
      dataList.value[0].value = parsedData.data[0]
      dataList.value[1].value = parsedData.data[1]

    }
  }
}

// CRC-8 校验
function calCRC8(buf) {
  if (!buf || buf.length === 0) {
    return 0;
  }

  let crc = 0;

  for (let i = 0; i < buf.length - 1; i++) {
    crc = crc_table[0x00ff & (crc ^ buf[i])];
  }

  return crc;
}


// 解析数据包
function parseOximeterData(hexData) {
  const bytes = hexData.match(/.{1,2}/g).map(byte => parseInt(byte, 16));

  if (bytes[0] !== 0xAA || bytes[1] !== 0x55) {
    console.error("无效包头");
    return null;
  }

  const command = bytes[2];
  const length = bytes[3];
  const type = bytes[4];
  const data = bytes.slice(5, 5 + length - 2);
  const checksum = bytes[3 + length];

  const dataBuffer = [
    bytes[0], bytes[1], command, length, type, ...data, 0x0
  ];

  const calculatedChecksum = calCRC8(dataBuffer);
  if (checksum !== calculatedChecksum) {
    console.error("校验和错误");
    return null;
  }

  return {
    command,
    length,
    type,
    data,
    checksum
  };
}



let timer = ref(null)
const handleClickStart = () => {
};

const oximeterModule = uni.requireNativePlugin('Leiye-Oximeter')
onMounted(() => {
  oximeterModule.openDevice({
    "ProductId": 9123,
    "VendorId": 1659
  }, (data) => {
    if (data.code === "success") {
      handleReceivedData(data.message);
    }
  })
});

onUnmounted(() => {
  oximeterModule.closeDevice();
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
  }
}
</style>