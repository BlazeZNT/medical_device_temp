import { defineStore } from 'pinia';
import { getUserInfoApi } from '@/services/api/user';
import type { UserInfoModel } from '@/services/model/userModel';
import { login as loginApi, checkCode } from '@/services/api/auth';
import { getToken, isLogin, setToken } from '@/utils/auth';
// import { removeCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';

export const useUserStore = defineStore('UserStore', () => {
	const token = ref<string | null>(null);
	const userInfo = ref<UserInfoModel | null>(null);

	// 初始化
	function initUserInfo() {
		// if (isLogin()) {
		// 	token.value = getToken();
		// 	getUserInfo();
		// }
	}

	// 是否登录
	const loggedIn = computed(() => !!token.value);

	// 登录
	const { send: sendLogin } = useRequest(checkCode, { immediate: false });
	async function login(params : LoginParams) {
		try {
			const res = await sendLogin(params); 
			token.value = res;
			setToken(res);
			// await getUserInfo();
		} catch (error) {
			throw error;
		}
	}

	// 获取用户信息
	const { send: _getUserInfo } = useRequest(getUserInfoApi, { initialData: null, immediate: false });
	async function getUserInfo() {
		try {
			userInfo.value = await _getUserInfo();
		} catch (error) {
			throw error;
		}
	}

	// 登出
	// const { send: sendLogout } = useRequest(logoutApi, { immediate: false });
	async function logout() {
		try {
			// await sendLogout();
			removeCache(TOKEN_KEY);
			userInfo.value = null;
			token.value = null;
		} catch (err : any) {
			throw err;
		}
	}

	return {
		userInfo,
		loggedIn,
		login,
		logout,
		getUserInfo,
		initUserInfo,
	};
});