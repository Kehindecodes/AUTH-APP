import axios from 'axios';

const baseURL = 'http://127.0.0.1:8080/verify';
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
	baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosInstance;
