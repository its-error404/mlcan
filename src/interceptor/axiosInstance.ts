import axios from 'axios';
import {ApiRoutes} from "../routes/routeConstants/apiRoutes";
import { getAuthToken } from '../services/AuthService/authToken';

const access_token = getAuthToken()

export const getHeaders = (): any => {
    let headers
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
    };
    return headers;
};

const axiosInstance = axios.create({
    baseURL: ApiRoutes.BASE_URL,
    timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
    
    config.headers = getHeaders();
    return config;
});

axiosInstance.interceptors.response.use(
    (response): any => {
        return {
            data: response.data,
            message: response.statusText,
            status: response.status
        }
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
