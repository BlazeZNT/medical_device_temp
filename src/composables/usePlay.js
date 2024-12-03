import {
	ref,
	shallowRef,
	onMounted,
	onUnmounted,
	reactive
} from 'vue'
import keyCenter from "@/pages/KeyCenter.js";

export function usePlay({engine,
	appendActionInfo,
	appendCallbackInfo,
	appendSuccessInfo
}) {
	const playStreamID = ref(keyCenter.streamID)
	const playVideoElem = shallowRef(null)
	const isPlayingStream = ref(false)
	const playBtnName = ref("Start Playing")
	const playVideoMuted = ref(true)
	const playStream = shallowRef(null)

	// 单击拉流操作
	async function onClickPlay() {
		if (isPlayingStream.value) {
			stopPlayingStream(playStreamID.value);
			playBtnName.value = "Start Playing";
		} else {
			// await loginRoom(roomID, userID, userName);
			startPlayingStream(playStreamID.value);
			playBtnName.value = "Stop Playing";
		}
		isPlayingStream.value = !isPlayingStream.value;
	}
	// 开始拉流
	async function startPlayingStream(streamID, config) {
		appendActionInfo(`Start Playing Stream: streamID:${streamID}`);
		const result = await engine.value.startPlayingStream(streamID, config);
		// #ifdef H5
		console.warn(result)
		playVideoElem.value.srcObject = result;
		// playStream = result
		// #endif
		return result
	}
	// 停止拉流
	function stopPlayingStream(streamID) {
		appendActionInfo(`Stop Playing Stream: streamID:${streamID}`);
		engine.value.stopPlayingStream(streamID);
		// #ifdef H5
		playVideoElem.value.srcObject = null;
		// playStream = null
		// #endif
	}
	function addPlayListeners() {
		engine.value.on(
			"playerStateUpdate",
			(streamID, state, errorCode, extendedData) => {
				appendCallbackInfo(
					`playerStateUpdate:streamID:${streamID}, state:${state}, errorCode:${errorCode}, extendedData:${JSON.stringify(
						extendedData
					)}`
				);
				if (state === 0) { 
					// #ifdef H5
					// playStream = null
					// uni.showMessage({
					//     content: extendedData
					// })
					// #endif
				}
			}
		);
		engine.value.on("roomStreamUpdate", (roomID, updateType, streamList) => {
			appendSuccessInfo(`roomStreamUpdate： roomID:${roomID}, updateType: ${updateType}, playStream: ${!!playStream.value}, isPlayingStream: ${isPlayingStream.value}`);
			// 流更新的相关操作, 以及关于断网后的重连出发的流更新
			const stream = streamList.find(item => item.streamID === playStreamID.value)
			console.warn(`stream:${JSON.stringify(stream)}, updateType: ${updateType}, playStream: ${playStream.value}, isPlayingStream: ${isPlayingStream.value}`)
			if(stream) {
				// 0 为add, 1 为delete
				if (updateType == 0) {
					// 拉流点击快于推流时，需要等流更新后重新拉
					if(isPlayingStream.value){
						// startPlayingStream 在 play.js文件
						startPlayingStream(playStreamID.value);
					}
				} else if (updateType == 1) {
					// if(isPlayingStream.value) {
					//     // onClickPlay 在 play.js文件
					//     state.onClickPlay()
					// }
				}
			}
		});
	}
	function playError(error) {
		console.warn('play error')
	}

	// 通过返回值暴露所管理的状态
	return {
		playStreamID,
		playVideoElem,
		isPlayingStream,
		playBtnName,
		playVideoMuted,
		playStream,
		onClickPlay,
		startPlayingStream,
		stopPlayingStream,
		addPlayListeners,
		playError
	}
}