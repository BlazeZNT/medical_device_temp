<template>
    <view class="container">
        <PictureInPictureLayout class="audio-video-view" v-if="renderPictureInPicture" :config="layout.config"
            :audioVideoConfig="audioVideoConfig">
            <template v-if="$slots.avatarView" #avatarView="{ userInfo }">
                <slot name="avatarView" :userInfo="userInfo"></slot>
            </template>
            <template #audioVideoForeground="{ userInfo }">
                <slot name="audioVideoForeground" :userInfo="userInfo"></slot>
            </template>
        </PictureInPictureLayout>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

import PictureInPictureLayout from "./PictureInPictureLayout.vue"
// import GalleryLayout from "./GalleryLayout.nvue"
import { ZegoLayoutConfig, ZegoLayout, ZegoLayoutMode, ZegoAudioVideoViewConfig } from '../defines';
import { zloginfo } from '../../utils';

const props = defineProps<{
    layout: ZegoLayout,
    audioVideoConfig: ZegoAudioVideoViewConfig,
}>()


const {
    layout = {
        mode: ZegoLayoutMode.PictureInPicture,
        config: {}
    },
    audioVideoConfig: { }
} = props

const renderPictureInPicture = ref(layout.mode === ZegoLayoutMode.PictureInPicture)

zloginfo(`renderPictureInPicture=${renderPictureInPicture}`)

</script>

<style scoped>
.container {
    display: flex;
    flex: 1;
    /* justify-content: space-between; */
}

.audio-video-view {
    display: flex;
    flex: 1;
}
</style>