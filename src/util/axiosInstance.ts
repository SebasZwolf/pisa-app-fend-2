import axios, { AxiosRequestConfig } from "axios";

import { url } from './app.json'

const axiosInstance = axios.create({
    baseURL: url,
});

axiosInstance.interceptors.request.use(config => {
    const newConfig : AxiosRequestConfig<any> = {...config};
    const token = localStorage.getItem('token');
    if (token) newConfig.headers!.Authorization = `Bearer ${token}`;
    return newConfig;
});

export default axiosInstance;
