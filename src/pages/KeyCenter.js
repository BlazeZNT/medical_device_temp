
// Developers can get appID from admin console.
// https://console.zego.im/dashboard
// for example:
//     const appID = 123456789;

let appID = 399794242

// Developers should customize a user ID.
// for example:
//     const userID = "zego_benjamin";
let userID = "uniapp"
// let userID = "uniapp_ios"

// AppSign only meets simple authentication requirements.
// If you need to upgrade to a more secure authentication method,
// please refer to [Guide for upgrading the authentication mode from using the AppSign to Token](https://docs.zegocloud.com/faq/token_upgrade)
// Developers can get AppSign from admin [console](https://console.zego.im/dashboard)
// for example: "abcdefghijklmnopqrstuvwxyz0123456789abcdegfhijklmnopqrstuvwxyz01"
// Note: Only valid for native apps.
let appSign = "05e4152d23e1181166291d71f570a1436352b2085ca1441ea5c1278aed55a416"

// Developers can get token from admin console.
// https://console.zego.im/dashboard
// Note: The user ID used to generate the token needs to be the same as the userID filled in above!
// for example:
//     const token = "04AAAAAxxxxxxxxxxxxxx";
let token = "04AAAAAGdNqlsAEGQ4cjlleTdhbm05OHljM2YAcJjWgMIZfIQedHq0AuQsNuHS7GefpHAHU8Vur1N6pd/bSlAK+AK9yr6xt1Hu7pZy+xEorZ8iL7Wfs+S7wGdIv8gBYoBAnKl7FDDcZYduSMIR2piVBjyLvR0BInFnvNuNxxKijlhoq0DhH1bGj5m5uEY="

function getAppID() {
	return getApp().globalData.appID ?? appID;
}

function getUserID() {
	let user_id = (getApp().globalData.userID ?? userID) || 'user_id_' + Math.floor(Math.random() * 1000000).toString(16)
	return user_id;
}

function getAppSign() {
	return (getApp().globalData.appSign ?? appSign);
}

function getToken() {
	return (getApp().globalData.token ?? token);
}

function setAppID(data) {
	getApp().globalData.appID = +data || appID;
}

function setUserID(data) {
	getApp().globalData.userID = data;
}

function setToken (data) {
	getApp().globalData.token = data;
}

function setAppSign (data) {
	getApp().globalData.appSign = data;
}

export default {
	setAppID,
	setUserID,
	setToken,
	getToken,
	setAppSign,
	getAppSign,
	getAppID,
	getUserID,
	streamID: 'uniapp_'+Date.now().toString(16)
}

