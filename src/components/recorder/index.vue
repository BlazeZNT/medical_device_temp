<template>
	<div class="textarea-container">
	   <div class="textarea-content" contenteditable="true">{{ transcription }}</div>
		<button v-if = "isRecording" class="record-button" @click="endRecord">Stop</button>
		<button  v-else class="record-button" @click="startRecord">Record</button>
		  <div v-if="isRecording" class="sound-wave">
			<span class="wave"></span>
			<span class="wave"></span>
			<span class="wave"></span>
		  </div>
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted, nextTick } from "vue";
	import { transcribeAudio } from '@/utils/auth';
	
	const isRecording = ref(false)
	const clickedButton = ref(null);
	
	const handleClick = (index, time) => {
	  clickedButton.value = index;
	  // console.log("Selected Time:", time);
	};
	
	// const ToggleMic = () => {
	// 	isRecording.value = !isRecording.value
	// }
	const recordingPath = ref(''); // Stores the path of the recorded audio
	
	
	
	// Initialize recorder manager and audio context
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	
	// Define reactive variables
	const voicePath = ref('');
	const transcription = ref('');
	// Setup recorder manager event handlers
	onMounted(() => {
		recorderManager.onStop((res) => {
		  console.log('Recorder stopped:', res);
		  voicePath.value = res.tempFilePath;
		  if (voicePath.value) {
			transcribeRecording(); // Ensure this function works as expected
		  }
		});
	});
	
	// Methods for recording and playback
	const startRecord = () => {
	  console.log('Start recording');
	  recorderManager.start();
	  isRecording.value = !isRecording.value
	};
	
	const endRecord = () => {
	  console.log('Stop recording');
	  recorderManager.stop();
	};
	
	const playVoice = () => {
	  if (voicePath.value) {
	    console.log('Play recording:', voicePath.value);
	    innerAudioContext.src = voicePath.value;
	    innerAudioContext.play();
	  }
	};
	
	
	const transcribeRecording = async () => {
	  if (voicePath.value) {
	    try {
	      console.log('Uploading audio for transcription...');
	      transcription.value = await transcribeAudio(voicePath.value); // Update the reactive variable
		  isRecording.value = !isRecording.value
	      console.log('Transcription:', transcription.value);
	    } catch (err) {
	      console.error('Error during transcription:', err);
	      uni.showToast({
	        title: 'Transcription failed',
	        icon: 'none',
	      });
		  isRecording.value = !isRecording.value
	    }
	  } else {
	    uni.showToast({
	      title: 'No audio to transcribe',
	      icon: 'none',
	    });
		isRecording.value = !isRecording.value
	  }
	};
</script>

<style>
	.textarea-container {
	  display: flex;
	  position: relative; /* Set relative positioning for the parent */
	  border: 1px solid #d8d8d8;
	  border-radius: 5px;
	  padding: 5px;
	  background-color: #29353d;
	  color: white;
	  min-height: 80px;
	  width: 100%;
	}
	
	.textarea-content {
	  flex: 1;
	  outline: none;
	  border: none;
	  background: transparent;
	  padding: 0;
	  color: white;
	  overflow-y: auto;
	  max-height: 150px;
	}
	
	.record-button {
	  position: absolute; /* Position the button absolutely within the container */
	  bottom: 8px; /* Align to the bottom of the container */
	  right: 8px; /* Align to the right side of the container */
	  background-color: #58ffcf;
	  color: black;
	  border: none;
	  border-radius: 3px; /* Slightly smaller border radius */
	  padding: 3px 6px; /* Reduce padding to make the button smaller */
	  font-size: 12px; /* Smaller font size */
	  cursor: pointer;
	}
	
	.sound-wave {
	  position: absolute;
	  bottom: 8px;
	  left: 50%;
	  transform: translateX(-50%);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 4px;
	}
	
	.wave {
	  width: 4px;
	  height: 10px;
	  background-color: #58ffcf;
	  border-radius: 2px;
	  animation: wave-animation 1s infinite ease-in-out;
	}
	
	.wave:nth-child(2) {
	  animation-delay: 0.2s;
	}
	
	.wave:nth-child(3) {
	  animation-delay: 0.4s;
	}
	
	@keyframes wave-animation {
	  0%, 100% {
	    height: 10px;
	  }
	  50% {
	    height: 20px;
	  }
	}
</style>