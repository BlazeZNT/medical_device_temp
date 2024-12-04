export declare class MediaPlayer {
    viewElem: HTMLMediaElement | any;
    arrts: {
        mute: boolean;
        loop: boolean;
        volume: number;
        playbackRate: number;
    };
    duration: number;
    src: string;
    startPosition: number;
    zegoWebRTC?: any;
    index: number;
    mixing: boolean;
    zegoWebrtcInstance: any;
    constructor(index: number);
    setWebRtcInstance(zegoWebrtcInstance: any): void;
    getIndex(): number;
    setPlayerCanvas(viewElem: HTMLMediaElement): Promise<void>;
    loadResource(path: string): Promise<unknown> | undefined;
    setPlayerView(id: string | number): Promise<void>;
    enableRepeat(enable: boolean): void;
    enableAux(enable: boolean, player: MediaPlayer): Promise<void>;
    setVolume(volume: number): void;
    start(): void;
    pause(): void;
    stop(): void;
    resume(): void;
    setPlaySpeed(speed: number): void;
    checkViewElem(): boolean;
    destroy(): void;
    setElemVolume(volume: number): void;
    getTotalDuration(): number;
    enableAccurateSeek(): void;
    getAudioTrackCount(): void;
    getCurrentProgress(): void;
    getCurrentState(): void;
    getNetworkResourceCache(): void;
    getPlayVolume(): void;
    muteLocal(): void;
    off(): void;
    on(): void;
    seekTo(): void;
    setAudioTrackIndex(): void;
    setNetworkBufferThreshold(): void;
    setNetworkResourceMaxCache(): void;
    setProgressInterval(): void;
    setPublishVolume(): void;
    setPlayVolume(): void;
    setVoiceChangerParam(): void;
    takeSnapshot(): void;
}