<script lang="ts" setup>
import { buttonProps } from "@/components/BasicButton/prpos";

const props = defineProps(buttonProps);
const emits = defineEmits(["click"]);
function click() {
  emits("click");
}
</script>

<template>
  <view
    class="default-btn"
    :class="[{ borderBtn: props.borderBtn }]"
    :disabled="props.disabled"
    @tap="click"
  >
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.default-btn {
  width: 100%;
  padding: 6rpx 0;
  display: inline-block;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  font-family: FB;
  text-align: center;
  &.borderBtn {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-family: FL;
  }
  &:hover {
    // background-color: #3b82f6;
  }
}
</style>
