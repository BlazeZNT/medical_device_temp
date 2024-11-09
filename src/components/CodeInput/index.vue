<template>
  <div class="happy-code-outsidebox">
    <div class="happy-code-box" v-for="(item, index) in digit" :key="index">
      <input
        type="number"
        class="happy-code-input"
        :style="{
          // boxShadow: digit_box_attribute[index].focus ? '0 0 20rpx grey' : '',
        }"
        v-model="digit_box_attribute[index].value"
        @input="oninput(index)"
        :focus="digit_box_attribute[index].focus"
        ref="digitbox"
        maxlength="1"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  digitboxcount: {
    type: Number,
  },
});

const emit = defineEmits(["outputcode"]);

//验证码位数
const digit = ref<Number>(props.digitboxcount);
const digit_box_attribute = ref<Object>([]);

for (let i: Number = 1; i <= digit.value; i++) {
  digit_box_attribute.value.push({
    focus: false,
    value: "",
  });
}

const digitbox = ref<Object>(null);

onMounted(() => {
  digit_box_attribute.value[0].focus = true;
});

function input_over(): void {}

function oninput(index: Number): void {
  if (digit_box_attribute.value[index].value.length > 0) {
    if (index <= digit.value - 1) {
      digit_box_attribute.value[index].focus = false;
      if (index < digit.value - 1)
        digit_box_attribute.value[index + 1].focus = true;

      if (index == digit.value - 1) {
        let temp_str: String = "";
        digit_box_attribute.value.map((item) => {
          temp_str += item.value;
        });
        emit("outputcode", temp_str);
      }

      // digit_box_attribute.value[index].focus=true
    }
  }
}
</script>
<style lang="scss" scoped>
.happy-code-outsidebox {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 10rpx;
}
.happy-code-box {
  /* width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  background-color: aquamarine;
  border: 3rpx solid #e8e8e8;
  text-align: center;
  font-size: 40rpx;
  transition: all 0.5s;
  caret-color: #e1e1e1;
  font-weight: 500;
  color: #636363; */
  width: 84.38rpx;
  height: 110.94rpx;
  background-color: transparent;
  box-sizing: border-box;
  background-image: linear-gradient(180deg, #2f3a44 0%, #192228 100%),
    linear-gradient(180deg, rgba(#58ffcf, 1) 0%, rgba(#162025, 1) 100%) !important;
  border-radius: 8rpx;
  background-clip: content-box, padding-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .happy-code-input {
    font-family: FM;
    font-weight: 700;
    font-size: 57rpx;
    color: #5beaff;
    line-height: 69rpx;
    letter-spacing: 5px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
