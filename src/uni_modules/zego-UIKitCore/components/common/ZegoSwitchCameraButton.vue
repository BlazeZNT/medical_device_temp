<template>
    <ZegoImageButton @click="onButtonPress"  :image="imageSource" :width="width" :height="height" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import ZegoImageButton from './ZegoImageButton.vue'

import ZegoUIKit from '../../ZegoUIKit';
import { makeListenerID, zloginfo } from '../../utils';
const LISTENER_ID = makeListenerID() // 生成回调ID

const props = withDefaults(defineProps<{
    iconFrontFacingCamera?: string;
    iconBackFacingCamera?: string;
    useFrontFacingCamera?: boolean;
    onPress?: () => void;
    width?: number;
    height?: number;
}>(), {
    width: 48,
    height: 48,
    useFrontFacingCamera: true,
});

const isFront = ref(props.useFrontFacingCamera);

import FrontFacingCameraImg from '../../assets/images/white_button_flip_camera@2x.png';
import BackFacingCameraImg from '../../assets/images/white_button_flip_camera@2x.png';

const imageSource = computed(() => {
    const pathFront = props.iconFrontFacingCamera || FrontFacingCameraImg;
    const pathBack = props.iconBackFacingCamera || BackFacingCameraImg;
    return isFront.value ? pathFront : pathBack
});


const onButtonPress = () => {
    ZegoUIKit.useFrontFacingCamera(!isFront.value);
    isFront.value = !isFront.value;
    if (props.onPress) {
        props.onPress();
    }
};


onMounted(() => {
});

onUnmounted(() => {
});

</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image {
    flex: 1;
}
</style>