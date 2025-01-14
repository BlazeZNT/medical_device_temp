/**
 * @description 设置系统剪贴板的内容
 * @param data 需要设置的内容
 * @param showToast 配置是否弹出提示，默认弹出提示
 * @constructor
 */
export function SetClipboardData(data: string, showToast = true) {
  return new Promise((resolve, reject) => {
    uni.setClipboardData({
      data,
      showToast,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * @description 获取系统剪贴板内容
 * @constructor
 */
export function GetClipboardData() {
  return new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * rpx 换算为 px
 * @param upx
 */
export function rpx2px(upx: number) {
  return uni.upx2px(upx);
}

/**
 * px 换算为 rpx
 * @param px
 */
export function px2rpx(px: number) {
  return px / (uni.upx2px(100) / 100);
}
