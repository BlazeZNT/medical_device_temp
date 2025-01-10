<template>
  <ContentBox>
    <view style="display: flex; flex-direction: column; align-items: center" >
      <view v-if="!showHeapler">
        <view class="title">HEIGHT</view>
        <view class="number"> {{ height }} <em>cm</em> </view>
        <view class="container">
          <!-- <view class="heightBox">
            <view class="scrollBox">
            </view>
          </view> -->
        </view>
        <view class="btnsbox">
          <BasicButton @click="handleClickStart">START</BasicButton>
        </view>
      </view>
      <HelperBox @next="handleClickNext" img="../../static/health/healper/2.png" tips="1.Stand on the height measurement device<br />2.Press the start button on the device" v-if="showHeapler"></HelperBox>
    </view>
  </ContentBox>
</template>

<script setup>
import ContentBox from "@/components/HealthStep/ContentBox.vue";
import HelperBox from "./HelperBox.vue";
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import BasicButton from "@/components/BasicButton/index.vue";

const props = defineProps({
  initChange: Function,
  checkChange: Function,
  nextFun: Function,
});
const chSerialPort = uni.requireNativePlugin('Fvv-UniSerialPort')
const state = reactive({});
const height = ref(0);

const emit = defineEmits(['callback'])

const onMessage = () => {
  // 监听串口
  chSerialPort.onMessageHex(rec => {

    // 检查数据包长度是否合适
    if (rec.length < 14) {
      console.error('接收到的数据包长度无效');
      return;
    }
    // 截取“0475”
    let hex = rec.substring(8, 12);  // 从索引 8 到 12 截取字符串

    // 将十六进制字符串转为十进制数 十进制数为检测到的毫米高度
    let decimal = parseInt(hex, 16);
    console.log(rec)
    console.log(`距离值: ${decimal} mm`);
    // 使用机器固定的超声探头高度减去测量高度得到身高
    height.value = (2500 - decimal) / 10;

    // 回传高度
    emit('callback', { name: 'Height', value: height.value + ' cm' })
  })
}

let isOpen = false;

onMounted(() => {
  // 固定接口ttys7
  chSerialPort.setPath('/dev/ttyS7')
  chSerialPort.setBaudRate(9600)
  // 打开串口
  chSerialPort.open(res => {
    if (!res.status) {
      uni.showToast({
        title: '设备连接失败，请联系管理员检查',
        icon: 'none',
        duration: 5000,
      })
      return
    }
    onMessage()
    isOpen = true;
  })
});

const initDev = () => {
  chSerialPort.setPath('/dev/ttyS7')
  chSerialPort.setBaudRate(9600)
  chSerialPort.open(res => {
    if (!res.status) {
      uni.showToast({
        title: '设备连接失败，请联系管理员检查',
        icon: 'none',
        duration: 5000,
      })
      return
    }
    onMessage()
    isOpen = true;
    chSerialPort.sendHex('55AA010505')
  })
}

function onScroll(event) {}

const showHeapler = ref(true);
const handleClickNext = () => {
  showHeapler.value = false;
};
const handleClickStart = () => {
  // 未打开串口进行重试
  if (!isOpen) {
    initDev()
    return;
  }
  // 55AA010505 为测量命令
  chSerialPort.sendHex('55AA010505')
};

// 在组件卸载前清理定时器
onBeforeUnmount(() => {
  // if (interval) {
  // 	clearInterval(interval); // 清理定时器
  // }
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
}
.btnsbox {
  width: 155.21rpx;
}

.title {
  width: 100%;
  text-align: center;
  font-family: FB;
  font-weight: 800;
  font-size: 17rpx;
  color: #12ffbb;
  line-height: 11rpx;
  letter-spacing: 3px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 20rpx;
}

.number {
  width: 100%;
  text-align: center;
  font-family: FB;
  font-weight: 700;
  font-size: 52rpx;
  color: #ffffff;
  line-height: 63rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 20rpx;
  em {
    font-family: FB;
    font-weight: 700;
    font-size: 16rpx;
    color: rgba(#ffffff, 0.5);
    line-height: 19rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.container {
  margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  .heightBox {
    width: 40rpx;
    height: 180rpx;
    background: linear-gradient(90deg, #03f8b2 0%, #395fc2 100%);
    // box-shadow: 0rpx 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.25);
    border-radius: 5rpx 5rpx 5rpx 5rpx;
    position: relative;

	.scrollBox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
	}
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      top: -2rpx;
      height: 108rpx;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, #20282e 0%, rgba(29, 37, 43, 0) 100%);
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      background: linear-gradient(180deg, rgba(29, 37, 43, 0) 0%, #1f252c 100%);
      bottom: -1rpx;
      height: 108rpx;
      left: 0;
      right: 0;
    }
  }
}
</style>