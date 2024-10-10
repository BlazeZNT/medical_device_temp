
export let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = import.meta.env.DEV_BASE_URL;
} else {
  baseUrl = import.meta.env.BASE_URL;
}

if (typeof baseUrl === 'undefined') {
  
} else {
  
}

export const apiPath = import.meta.env.API_PATH;

export const staticUrl = import.meta.env.STATIC_URL;

export default {
  baseUrl,
  apiPath,
  staticUrl,
};
