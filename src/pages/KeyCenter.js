
// Developers can get appID from admin console.
// https://console.zego.im/dashboard
// for example:
//     const appID = 123456789;

let appID = 1789747285

// Developers should customize a user ID.
// for example:
//     const userID = "zego_benjamin";
let userID = "hoho"
// let userID = "uniapp_ios"

// AppSign only meets simple authentication requirements.
// If you need to upgrade to a more secure authentication method,
// please refer to [Guide for upgrading the authentication mode from using the AppSign to Token](https://docs.zegocloud.com/faq/token_upgrade)
// Developers can get AppSign from admin [console](https://console.zego.im/dashboard)
// for example: "abcdefghijklmnopqrstuvwxyz0123456789abcdegfhijklmnopqrstuvwxyz01"
// Note: Only valid for native apps.
let appSign = "235e1f1d562955076748afddd39d5327534040c9b092a74f599856a42fd97ed4"

// Developers can get token from admin console.
// 	https://console.zego.im/dashboard
// Note: The user ID used to generate the token needs to be the same as the userID filled in above!
// for example:
//     const token = "04AAAAAxxxxxxxxxxxxxx";
let token = "04AAAAAGdJmxsAEDMxbHN0ejA5bzFtajViazAAoKNob/cv5WGWIk0G4qcm9EoxcIBoPMOa5VqvLDxzNzhWyZ+Wnw0dNj0TntVV2PC94seIpDomBs+80CHngQw4aC8K9JMPUu/S25f34r+pojukW4vEcReFCkWgIIiUVmqcyVn3PeBtZ5oNkNOvI6UHuI7X6fsapoIoGCpPSgT5MKrgd8gZw1fkIJVY/HG+v3TqfmT0Enbr5b5ci7YxPuyiJtc="

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

