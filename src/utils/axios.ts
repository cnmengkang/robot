// axiosInstance.js

import axios from 'axios';
import { BASE_URL } from '../../env';

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}devops/`,
    timeout: 10000, // 请求超时时间（毫秒）
    headers: {
        'Content-Type': 'application/json',
        // 其他默认请求头
    },
});

// 封装GET请求
const get = async (url: any, params: any) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Network error');
    }
};

// 封装POST请求
const post = async (url: any, data: any) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error.response.data.message || 'Network error');
    }
};

export const fetchData = {
    get,
    post,
};

export default axiosInstance;
