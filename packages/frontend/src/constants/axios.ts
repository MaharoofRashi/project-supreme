/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "../constants/base-url";
import { getRefreshToken } from "../service/AdminService";
import useAuthStore from "../store/authState";
import axios, { AxiosError } from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}`
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: any) => response,
  async (error: AxiosError | any) => {
    const originalRequest = error.config;
    if(error.response.data?.message){
      console.error(error.response.data.message)
    }
    if (error.response?.status === 401 && error.response.data?.message === 'Unauthorized - Invalid token') {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const refreshResponse = await getRefreshToken(refreshToken)
        useAuthStore.getState().updateAccessToken(refreshResponse.data.accessToken)
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.error('Refresh token failed:', error);
        useAuthStore.getState().logout();
      }
    }
  }
)

export default instance