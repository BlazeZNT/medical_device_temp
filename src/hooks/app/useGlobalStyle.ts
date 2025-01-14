import pagesJson from '@/pages.json';

const { globalStyle } = pagesJson;
/**
 * 全局样式
 */
export function useGlobalStyle() {
  const { navigationBarTextStyle, navigationBarTitleText, navigationBarBackgroundColor, backgroundColor } = globalStyle;
  return {
    navigationBarTextStyle,
    navigationBarTitleText,
    navigationBarBackgroundColor,
    backgroundColor,
  };
}
