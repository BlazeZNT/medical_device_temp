import { staticUrl } from '@/slibrary/config';

// 静态资源地址
export const _static = (url = '', staticurl = 'local') => {
  if (staticurl === '') {
    staticurl = staticUrl;
  }
  if (staticurl !== 'local') {
    url = _cdn(url, staticurl);
  }
  return url;
}

export default {
  static: _static,
}
