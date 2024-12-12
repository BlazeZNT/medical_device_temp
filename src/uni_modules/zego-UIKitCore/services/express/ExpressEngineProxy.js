import { SimpleExpressEventHandler } from "./SimpleExpressEventHandler";
import { zloginfo } from "../../utils";
// 指定这个 App版本方便做语法提示
// import ZegoExpressEngine from "@/uni_modules/zego-ZegoExpressUniApp-JS/lib/ZegoExpressEngineApp";
import ZegoExpressEngine from "./ZegoExpressUniApp";
const TAG = '[ExpressEngineProxy]';
export class ExpressEngineProxy {
    static expressEventHandler;
    static engine;
    static async createEngine(appID, appSign, scenario, config) {
        const profile = {
            appID,
            appSign,
            scenario,
        };
        this.expressEventHandler = new SimpleExpressEventHandler();
        if (config) {
            await ZegoExpressEngine.setEngineConfig(config);
        }
        this.engine = await ZegoExpressEngine.createEngineWithProfile(profile);
        zloginfo(TAG, `createEngine version=${(await ZegoExpressEngine.getVersion())} engine=${!!this.engine}`);
        for (let key of Object.keys(this.expressEventHandler)) {
            const evt = key;
            this.engine.on(evt, this.expressEventHandler[evt]);
        }
    }
    static startPlayingStream(streamID, config) {
        zloginfo(TAG, 'startPlayingStream', streamID);
        return this.engine.startPlayingStream(streamID, config);
    }
    static startPreview(channel) {
        return this.engine.startPreview(channel);
    }
    static stopPreview(channel) {
        return this.engine.stopPreview(channel);
    }
    static setAppOrientation(orientation, channel) {
        return this.engine.setAppOrientation(orientation, channel);
    }
    static getAudioRouteType() {
        return this.engine.getAudioRouteType();
    }
    static useFrontCamera(isFrontFacing, channel) {
        return this.engine.useFrontCamera(isFrontFacing, channel);
    }
    static setAudioRouteToSpeaker(routeToSpeaker) {
        return this.engine.setAudioRouteToSpeaker(routeToSpeaker);
    }
    static muteMicrophone(mute) {
        return this.engine.muteMicrophone(mute);
    }
    static async setStreamExtraInfo(extraInfo, channel) {
        return this.engine.setStreamExtraInfo(extraInfo, channel);
    }
    static startPublishingStream(streamID, channel, config) {
        return this.engine.startPublishingStream(streamID, channel, config);
    }
    static setVideoConfig(config, channel) {
        return this.engine.setVideoConfig(config, channel);
    }
    static getVideoConfig(channel) {
        return this.engine.getVideoConfig(channel);
    }
    static stopPublishingStream(channel) {
        return this.engine.stopPublishingStream(channel);
    }
    static enableCamera(on, channel) {
        return this.engine.enableCamera(on, channel);
    }
    static muteAllPlayStreamAudio(mute) {
        return this.engine.muteAllPlayStreamAudio(mute);
    }
    static muteAllPlayStreamVideo(mute) {
        return this.engine.muteAllPlayStreamVideo(mute);
    }
    static sendBroadcastMessage(roomID, message) {
        return this.engine.sendBroadcastMessage(roomID, message);
    }
    static loginRoom(roomID, user, config) {
        return this.engine.loginRoom(roomID, user, config);
    }
    static logoutRoom(roomID) {
        // const result = await this.engine!.logoutRoom(roomID)
        // console.warn('logoutRoom', result)
        return this.engine.logoutRoom(roomID);
    }
    static setRoomExtraInfo(roomID, key, value) {
        return this.engine.setRoomExtraInfo(roomID, key, value);
    }
    static sendCustomCommand(roomID, command, toUserList) {
        return this.engine.sendCustomCommand(roomID, command, toUserList);
    }
    static stopPlayingStream(streamID) {
        return this.engine.stopPlayingStream(streamID);
    }
    static stopSoundLevelMonitor() {
        return this.engine.stopSoundLevelMonitor();
    }
    static getEngine() {
        return this.engine;
    }
    static setEngineConfig(config) {
        return ZegoExpressEngine.setEngineConfig(config);
    }
    static renewToken(roomID, token) {
        return this.engine.renewToken(roomID, token);
    }
    static startSoundLevelMonitor(config) {
        return this.engine.startSoundLevelMonitor(config);
    }
    static addEventHandler(eventHandler) {
        return this.expressEventHandler?.addHandler(eventHandler);
    }
    static removeEventHandler(eventHandler) {
        return this.expressEventHandler?.removeHandler(eventHandler);
    }
    /**
     * 移除事件处理器列表。
     *
     * @param list 要移除的事件处理器列表。
     */
    static removeEventHandlerList(list) {
        if (list.length === 0) {
            return;
        }
        this.expressEventHandler?.removeEventHandlerList(list);
    }
    static sendBarrageMessage(roomID, message) {
        return this.engine.sendBarrageMessage(roomID, message);
    }
    static mutePlayStreamAudio(streamID, mute) {
        return this.engine.mutePlayStreamAudio(streamID, mute);
    }
    static mutePlayStreamVideo(streamID, mute) {
        return this.engine.mutePlayStreamVideo(streamID, mute);
    }
    static startMixerTask(task) {
        return this.engine.startMixerTask(task);
    }
    static stopMixerTask(task) {
        return this.engine.stopMixerTask(task);
    }
    static uploadLog() {
        return this.engine.uploadLog();
    }
    static destroyEngine() {
        zloginfo(TAG, 'destroyEngine');
        this.expressEventHandler?.removeAllEventHandlers();
        this.expressEventHandler = null;
        this.engine = null;
        ZegoExpressEngine.destroyEngine();
    }
}
