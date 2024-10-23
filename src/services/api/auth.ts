import { request } from '@/utils/http';

const LOGIN = '/login';
const LOGIN_OUT = '/logout';
const REFRESH_TOKEN = '/refresh/token';
const SEND_CODE = '/api/fronted/sendCode';

const REGISTER = '/api/fronted/register'


// 验证邮箱登录
export function sendCode(params) {
	return request.Post<LoginModel>(SEND_CODE, params, {
		meta: {
			ignoreAuth: true
		}
	});
}


// 注册
export function resgister(params) {
	return request.Post<LoginModel>(REGISTER, params, {
		meta: {
			ignoreAuth: true
		}
	});
}



/**
 * 登录
 * @param params
 */
export function login(params : LoginParams) {
	return request.Post<LoginModel>(LOGIN, params, {
		meta: {
			ignoreAuth: true,
		},
	});
}

/**
 * 登出
 */
export function logout() {
	return request.Post(LOGIN_OUT, {});
}

/**
 * 刷新token
 */
export function refreshToken() {
	return request.Post<LoginModel>(REFRESH_TOKEN, {});
}

/**
 * 刷新token
 */
export function checkCode(params) {
	return request.Post<LoginModel>('/api/fronted/checkCode', params, {
		meta: {
			ignoreAuth: true,
		},
	});
}