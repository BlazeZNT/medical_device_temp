<template>
  <div id="app" ref="root"></div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// get token
function generateToken(tokenServerUrl, appID, userID) {
  // Obtain the token interface provided by the App Server
  return fetch(tokenServerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: appID,
      user_id: userID,
    }),
  }).then((res) => res.text());
}

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default {
  name: 'App',
  components: {},
  mounted() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const userID = randomID(5);
    const userName = randomID(5);
    // generate token
    generateToken(
      'https://preview-uikit-server.zegotech.cn/api/token',
      2013980891,
      userID
    ).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        2013980891,
        res,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);
      // start the call
      zp.joinRoom({
        container: this.$refs.root,
        showPreJoinView: false,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.origin +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    });
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
