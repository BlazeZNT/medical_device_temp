<template>
    <view class="container">
        <view class="big-view">
            <zego-audio-video-view v-if="bigViewUser" :id="bigViewUser.userID" :key="bigViewUser.userID"
                :userID="bigViewUser.userID" :showSoundWave="showSoundWavesInAudioMode"
                :audio-view-backgroud-color="largeViewBackgroundColor"
                :audio-view-backgroud-image="largeViewBackgroundImage" :useVideoViewAspectFill="useVideoViewAspectFill"
                :isPictureInPicture="true" :avatar-size="bigViewAvatarSize">
                <template v-if="$slots.avatarView" #avatar="{ userInfo }">
                    <slot name="avatarView" :userInfo="userInfo"></slot>
                </template>
                <template #foreground="{ userInfo }">
                    <slot name="audioVideoForeground" :userInfo="userInfo"></slot>
                </template>
            </zego-audio-video-view>
        </view>
        <view class="small-view-container" :style="smallViewPostStyle">
            <zego-audio-video-view v-for="(user, index) in smallViewUserList" :key="user.userID" :id="user.userID"
                class="small-view" :style="smallViewStyle" @touchstart="switchLargeOrSmallView(index)"
                :userID="user.userID" :showSoundWave="showSoundWavesInAudioMode"
                :audio-view-backgroud-color="smallViewBackgroundColor"
                :audio-view-backgroud-image="smallViewBackgroundImage" :useVideoViewAspectFill="useVideoViewAspectFill"
                :isPictureInPicture="true" :avatar-size="smallViewAvatarSize">
                <template v-if="$slots.avatarView" #avatar="{ userInfo }">
                    <slot name="avatarView" :userInfo="userInfo"></slot>
                </template>
                <template #foreground="{ userInfo }">
                    <slot name="audioVideoForeground" :userInfo="userInfo"></slot>
                </template>
            </zego-audio-video-view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

import ZegoAudioVideoView from '../audiovideo/ZegoAudioVideoView.vue';
import ZegoUIKit, { ZegoAudioVideoUpdateListener, ZegoUIKitUser, ZegoUserUpdateListener } from '../../';
import { ZegoLayoutPictureInPictureConfig, ZegoAudioVideoViewConfig, ZegoViewPosition } from '../defines';
import { makeListenerID, zloginfo } from '../../utils';

const LISTENER_ID = makeListenerID() // 生成回调ID


const props = defineProps<{
    config?: ZegoLayoutPictureInPictureConfig,
    audioVideoConfig?: ZegoAudioVideoViewConfig
}>()

const {
    useVideoViewAspectFill = true,
    showSoundWavesInAudioMode = true,
} = props.audioVideoConfig ?? {};

const {
    smallViewSize = { width: 85, height: 151 },
    spacingBetweenSmallViews = 8,
    smallViewBorderRadius = 0,
    smallViewPosition = ZegoViewPosition.TopRight,
    removeViewWhenAudioVideoUnavailable = true,
    switchLargeOrSmallViewByClick = true,
    smallViewBackgroundColor,
    smallViewBackgroundImage,
    largeViewBackgroundColor,
    largeViewBackgroundImage,
} = props.config || {};

const bigViewAvatarSize = ref({ width: 130, height: 130 })
const smallViewAvatarSize = ref({ width: 65, height: 65 })

const globalAudioVideoUserList = ref<ZegoUIKitUser[]>([])

const smallViewStyle = ref({
    width: smallViewSize?.width,
    height: smallViewSize?.height,
    marginBottom: spacingBetweenSmallViews,
    borderRadius: smallViewBorderRadius,
})

const bigViewUser = computed<ZegoUIKitUser | null>(() => {

    if (globalAudioVideoUserList.value.length === 0) {
        // console.error('update bigViewUser globalAudioVideoUserList ===0')
        return null
    } else {
        // 第一个人显示成大图
        const user = globalAudioVideoUserList.value[0]
        // if (ZegoUIKit.isLocalUser(user.userID)) {
        //     return ZegoUIKit.getLocalUser()
        // }
        // console.error('update bigViewUser=', JSON.stringify(user))
        return user
    }
})

const smallViewUserList = computed<ZegoUIKitUser[]>(() => {
    // 画中画最多 4个
    const userList = globalAudioVideoUserList.value.slice(1, 4)
    // console.error('update smallViewUserList globalAudioVideoUserList userList=', JSON.stringify(userList))
    return userList
})


const styleList = [
    { // smallViewPostTopLeft
        top: "80rpx",
        left: "12rpx"
    },
    {//smallViewPostTopRight
        top: "80rpx",
        right: "12rpx"
    },
    {//smallViewPostBottomLeft
        bottom: "100rpx",
        left: "12rpx",
        /* justifyContent 不直接适用于Vue CSS，可能需要flex-direction和align-items等替代方案 */
        justifyContent: "flex-end",
    },
    {//smallViewPostBottomRight
        bottom: "100rpx",
        right: "12rpx",
        justifyContent: "flex-end",
    }
]

const smallViewPostStyle = ref(styleList[smallViewPosition])




/**
 * 排个序, 确保自己在第二个, 默认是大图显示对方
 * @param globalAudioVideoUserList 
 */
function sortAudioVideo() {
    if (globalAudioVideoUserList.value.length > 1) {
        const userID = ZegoUIKit.getLocalUser()?.userID
        const index = globalAudioVideoUserList.value.findIndex(user => user.userID === userID);
        if (index !== -1) {
            const localUser = globalAudioVideoUserList.value.splice(index, 1)[0];
            globalAudioVideoUserList.value.splice(1, 0, localUser);
        }
    }
};


function addUsers(userList: ZegoUIKitUser[]) {
    // 根据 userid 去重后添加到 globalAudioVideoUserList
    // 避免重复添加，先通过userID检查用户是否已存在于globalAudioVideoUserList中
    userList.forEach(newUser => {
        const result = globalAudioVideoUserList.value.find(user => user.userID === newUser.userID);
        // 如果用户不在列表中，则添加
        if (!result) {
            globalAudioVideoUserList.value.push(newUser);
            sortAudioVideo()
        }
    });
}


function removeUsers(userList: ZegoUIKitUser[]) {
    // 从 globalAudioVideoUserList 中找到对应 userid 的删掉
    if (removeViewWhenAudioVideoUnavailable) {
        // 直接通过userID从globalAudioVideoUserList中移除对应的用户对象
        userList.forEach(userToRemove => {
            const index = globalAudioVideoUserList.value.findIndex(user => user.userID === userToRemove.userID);
            if (index !== -1) {
                globalAudioVideoUserList.value.splice(index, 1);
            }
        });
    }
}

function switchLargeOrSmallView(index: number) {
    if (switchLargeOrSmallViewByClick) {
        zloginfo("[PictureInPictureLayout] switchLargeOrSmallView old views: ", JSON.stringify(globalAudioVideoUserList.value))
        // 第一个是大图, 但是这里的 index 是小图的, 因此要加1
        const targetIndex = index + 1;
        [globalAudioVideoUserList.value[0], globalAudioVideoUserList.value[targetIndex]] = [globalAudioVideoUserList.value[targetIndex], globalAudioVideoUserList.value[0]];
        zloginfo("[PictureInPictureLayout] new sorted videos: ", JSON.stringify(globalAudioVideoUserList.value))
    }
}

onMounted(() => {
    ZegoUIKit.addAudioVideoUpdateListener(LISTENER_ID, { // ZegoAudioVideoUpdateListener
        onAudioVideoAvailable(userList) {
            zloginfo("[PictureInPictureLayout] onAudioVideoAvailable", JSON.stringify(userList))
            addUsers(userList)
        },
        onAudioVideoUnAvailable(userList) {
            zloginfo("[PictureInPictureLayout] onAudioVideoUnAvailable", JSON.stringify(userList))
            removeUsers(userList)
        },
    })
    ZegoUIKit.addUserUpdateListener(LISTENER_ID, { // ZegoUserUpdateListener
        onUserLeft(userList) {
            zloginfo("[PictureInPictureLayout] removeUsers", JSON.stringify(userList))
            removeUsers(userList)
        },
    })
})

onBeforeUnmount(() => {
    zloginfo("beforeDestroy PictureInPictureLayout")
    ZegoUIKit.removeAudioVideoUpdateListener(LISTENER_ID)
    ZegoUIKit.removeUserUpdateListener(LISTENER_ID)
})

</script>

<style scoped>
.container {
    display: flex;
    flex: 1;
    position: relative;
}

.big-view {
    flex: 1;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.small-view-container {
    position: absolute;
    z-index: 12;
    display: flex;
    align-items: center;

}

.small-view {
    overflow: hidden;
    background-color: #4A4B4D;
    border-width: 0.5rpx;
    border-color: #A4A4A4;
}
</style>