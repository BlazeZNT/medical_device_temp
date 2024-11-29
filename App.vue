<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
/* @import './common/uni-nvue.css'; */
@import './common/zego-nvue.css';
.video-view{
	height: 400rpx;
	flex: 1;
}
/* #ifdef H5 */
video{
	height: 400rpx;
	flex: 1;
}
uni-page-wrapper, uni-page-body{
	height: 100%;
	overflow: scroll;
}
button{
	margin: 10rpx;
}
button:active{
	opacity: 0.7;
}
/* #endif */
</style>
