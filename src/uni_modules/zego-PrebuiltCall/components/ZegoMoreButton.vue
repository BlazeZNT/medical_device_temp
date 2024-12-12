<template>
    <view :style="{ width: width + 'rpx', height: height + 'rpx' }" @click="onPress">
        <image :src="imageSource" mode="aspectFit" class="button-image" />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    onPress?: () => void,
    width?: number,
    height?: number,
}>(), {
    width: 48,
    height: 48,
});

import MoreImg from '../assets/images/white_button_more@2x.png'

const imageSource = ref(MoreImg)

const onPress = async () => {
    if (props.onPress) {
        props.onPress();
    }
};
</script>

<style scoped>
.leave-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-image {
    flex: 1
}
</style>