import { ZegoPluginProtocol } from "./ZegoPluginProtocol";
import { ZegoPluginType } from "./ZegoPluginType";
export declare class ZegoPluginAdapter {
    private static mPlugins;
    static installPlugins(plugins: ZegoPluginProtocol[] | undefined): void;
    static getPlugin(pluginType: ZegoPluginType): ZegoPluginProtocol | undefined;
}
