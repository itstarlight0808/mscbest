import Axios from "axios";
import Cookie from "js-cookie";
import { COOKIE_KEY, CONFIG } from "../config/index";

const httpClient = Axios.create({
    baseURL: `${CONFIG.serverPath}/api`,
    // baseURL: "https://musicalbest.com/api",
});

httpClient.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

httpClient.interceptors.request.use(config => {
	let userInfo = Cookie.getJSON(COOKIE_KEY.USER_INFO) || '';

	if(userInfo){
		config.headers.Authorization = `Bearer ${userInfo.token || ''}`;		
	}
	
	return config;
});

httpClient.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response.status === 401) {
			Cookie.remove(COOKIE_KEY.USER_INFO);
			Cookie.remove(COOKIE_KEY.USER_LOCALE);
			location.href="/signin";
		}
		return Promise.reject(error);
	}
);

export default httpClient;