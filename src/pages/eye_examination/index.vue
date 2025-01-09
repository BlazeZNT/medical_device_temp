<template>
	<LayoutContent showBack @back="handleClickBack">
		<view class="pageView">
			<view class="pageView-title" v-if="state.step === 1">Tell Your Complaints</view>
			<view class="pageView-title" v-if="state.step === 2">Tell your medical history</view>
			<view class="form">
				<uni-forms   v-if="state.step === 1" label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
					<view class="column">
						<uni-forms-item label="OD Vision" name="odvision" style="margin-right: 20rpx;">
							<uni-easyinput type="text" v-model="state.userInfo.odvison"/>
						</uni-forms-item>
						<uni-forms-item label="OS Vision" name="osvision">
							<uni-easyinput type="text" v-model="state.userInfo.osvision"/>
						</uni-forms-item>
					</view>
					<view class="column">
						<uni-forms-item label="OD IOP" name="odiop" style="margin-right: 20rpx;">
							<uni-easyinput type="text" v-model="state.userInfo.odiop"/>
						</uni-forms-item>
						<uni-forms-item label="OS IOP" name="osiop" >
							<uni-easyinput type="text" v-model="state.userInfo.osiop"/>
						</uni-forms-item>
					</view>
					<view class="column">
					  <uni-forms-item label="Your eye complaints" name="healthComplaints">
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
					  </uni-forms-item>
					</view>
					<view class="column">
						<view class="textcontent">
							<view class="texttitle">Your eye complaints</view>
							<view class="timeButtons">
							  <BasicButton
								v-for="(time, index) in symptoms"
								:key="index"
								@click="handleClick(index, time)"
								:class="['custom-button', { 'button-clicked': clickedButton === index }]">
								{{ time }}
							  </BasicButton>
							</view>
						</view>
					</view>
					
				</uni-forms>
				<uni-forms   v-if="state.step === 2" label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
					<view class="column">
					  <uni-forms-item label="Tell your health complaints" name="healthComplaints">
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
					  </uni-forms-item>
					</view>
					<view class="column">
					  <view class="textcontent">
					    <view class="texttitle">Or select these medical histories</view>
					    <view class="timeButtons">
					      <BasicButton
					        v-for="(item, index) in history"
					        :key="index"
					        @click="handleClickHistory(index, item)"
					        :class="['custom-button', { 'button-clicked': clickedHistory === index }]">
					        {{ item }}
					      </BasicButton>
					    </view>
					  </view>
					</view>
					<!-- Conditional Rendering for Diabetes Options -->
					<view v-if="clickedHistory !== null && history[clickedHistory] === 'Diabetes'" class="column">
					  <view class="textcontent">
					    <view class="texttitle">Diabetes history</view>
					    <view class="timeButtons">
					      <BasicButton
					        v-for="(item, index) in diabetesOptions"
					        :key="index"
					        @click="handleClickDiabetesOption(index, item)"
					        :class="['custom-button', { 'button-clicked': clickedDiabetesOption === index }]">
					        {{ item }}
					      </BasicButton>
					    </view>
					  </view>
					</view>
					<!-- Glucose Options -->
					<view v-if="clickedHistory !== null && history[clickedHistory] === 'Diabetes'" class="column">
					  <view class="textcontent">
					    <view class="texttitle">Glucose Levels</view>
					    <view class="timeButtons">
					      <BasicButton
					        v-for="(item, index) in glucose"
					        :key="index"
					        @click="handleClickGlucoseOption(index, item)"
					        :class="['custom-button', { 'button-clicked': clickedGlucoseOption === index }]">
					        {{ item }}
					      </BasicButton>
					    </view>
					  </view>
					</view>
					
				</uni-forms>
				<BasicButton v-if="state.step === 1" @click="handleClickRegister">
				    NEXT
				</BasicButton>
				<BasicButton v-if="state.step === 2" @click="toassessment">
				    START ASSESSMENT
				</BasicButton>
			</view>
		</view>
	</LayoutContent>
</template>

<script setup>
	import LayoutContent from "@/components/Layout/Content.vue";
	import slibrary from "@/slibrary/index.js";
	import BasicButton from "@/components/BasicButton/index.vue";
	import CodeInput from "@/components/CodeInput/index.vue";
	import { useAppStore } from "@/stores/app"; // Import the store
	import { transcribeAudio } from '@/utils/auth';
	
	const appStore = useAppStore(); // Access the Pinia store
	const symptoms = ["Blurred Vision", "Dry Eyes", "Puffy Eyes", "Distortion"]; 
	const history = ["Diabetes", "Hypertension", "Hyperlipemia", "Nephropathy", "Rheumatism", "Asma", "Tumour"]; 
	const glucose = ["Good", "Normal", "Poor"]; 
	
	import {
		ref,
		reactive,
		onMounted
	} from "vue";
	// import {
	// 	sendCode
	// } from "@/services/api/auth";

	// 使用 reactive 创建响应式状态
	const state = reactive({
		step: 1,
		userInfo: {
			odvision: '',
			osvision: '',
			odiop: '',
			osiop: '',
			complaints: '',
			selectsymptoms: '',
		},
	});
	
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
	
	
	// const handleTextChange = (event) => {
	//   transcript.value = event.target.innerText;
	// };

	const loading = ref(false);
	const handleClickBack = () => {
	  if (state.step === 1) {
		slibrary.$router.go("/pages/health/index");
	  } else {
		state.step = state.step - 1;
	  }
	};
	const handleClickRegister = () => {
		state.step = 2
	}

	const handleClickLoginCreate = () => {
		slibrary.$router.go("/pages/health/index");
	}


	const handleTapVerify = async () => {
		loading.value = true;

		setTimeout(() => {
			slibrary.$helper.toast("Successfully sent！");
			setTimeout(() => {
				loading.value = false;
				slibrary.$router.go("/pages/login/pin");
			}, 1500);
		}, 1000);
		// try {
		// 	const res = await sendCode({
		// 		email: form.value.email
		// 	})
		// 	slibrary.$helper.toast('Successfully sent！')
		// 	setTimeout(() => {
		// 		loading.value = false
		// 		slibrary.$router.go('/pages/login/pin')
		// 	}, 1500)
		// }catch(err) {
		// }
	};
	
	// Define the additional options for Diabetes
	const diabetesOptions = ["0-5 years", "5-10 years", "10-15 years", "20+ years"];
	
	// Define reactive states
	const clickedHistory = ref(null); // Tracks which main history button is clicked
	
	// Handle clicks on the main history buttons
	const handleClickHistory = (index, item) => {
	  clickedHistory.value = index; // Set the clicked button index
	};
	
	// Handle clicks on the diabetes options
	const clickedDiabetesOption = ref(null); // Tracks selected diabetes option
	const clickedGlucoseOption = ref(null); // Tracks selected glucose option
	
	// Handle clicks on the diabetes options
	const handleClickDiabetesOption = (index, item) => {
	  clickedDiabetesOption.value = index; // Set the clicked diabetes option index
	};
	
	// Handle clicks on the glucose options
	const handleClickGlucoseOption = (index, item) => {
	  clickedGlucoseOption.value = index; // Set the clicked glucose option index
	};
	
	const toassessment = () => {
	   slibrary.$router.go("/pages/eye_examination/assessment");
	}
</script>

<style lang="scss" scoped>
	.pageView {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 25px;

		.pinBox {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pinBtn {
				margin-top: 50rpx;
				width: 436rpx;
				display: flex;
				justify-content: center;
			}
		}

		&-title {
			font-family: FB;
			color: #fff;
			font-size: 20px;
			margin-bottom: 20px;

			i {
				color: #06ffb8;
			}
		}
	}

	.form {
		width: 386.46rpx;

		.column {
			display: flex;
			width: 100%;
		}
	}

	:deep() {
		.uni-forms-item {
			flex: 1;
			margin-bottom: 10px;
		}

		.uni-forms-item__label {
			  white-space: nowrap; 

			text {
				color: #58FFCF;
				font-size: 9rpx !important;
				line-height: 10rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}
		}

		.uni-easyinput__content.is-input-border {
			background-color: transparent !important;
			border: 1px solid #D8D8D8 !important;
			color: #fff !important;
		}

	}
	
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
	
	.custom-button {
	  flex: 1 1 auto;
	  margin: 5px;
	  font-size: 14px;
	  border: 1px solid darkgreen;
	  border-radius: 5px;
	  background-color: transparent;
	  color: white;
	  cursor: pointer;
	  text-align: center;
	  transition: background-color 0.3s ease, color 0.3s ease;
	  padding: 5px;
	}
	
	.button-clicked {
	  color: black;
	  background-color: #58FFCF;
	}
	.timeButtons {
	  display: grid;
	  grid-template-columns: repeat(4, 1fr); /* Create 4 equal columns */
	  gap: 5px; /* Add spacing between rows and columns */
      padding: 5px;
	}
	.texttitle{
		color: #58FFCF;
		font-size: 0.28125rem !important;
		line-height: 0.3125rem;
		text-align: left;
		margin-top: 10px;
	}
	.textcontent{
	  width: 100%;
	}
	:deep(.uni-forms-item) {
	  justify-content: flex-start; /* Or adjust as per layout needs */
	  margin: 0; /* Remove any unwanted margins */
	}
	
	
</style>