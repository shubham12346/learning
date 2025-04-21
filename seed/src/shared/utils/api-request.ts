import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../core/interceptors/axios-instance';
import { SERVER_API_URL } from '../constants/constants';

export interface TAxiosCustomConfig {
  variables?: string;
  setLoading?: (res: true | false) => void;
}
export interface Config extends AxiosRequestConfig {
  custom?: TAxiosCustomConfig;
}

export async function apiGet<T = any>(
  resource: string,
  config?: AxiosRequestConfig
) {
  return axiosInstance.get<T>(`${SERVER_API_URL}${resource}`, config);
}

export async function apiPost<T = any>(
  resource: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return axiosInstance.post<T>(resource, data, config);
}

export async function apiPatch<T = any>(
  resource: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return axiosInstance.patch<T>(resource, data, config);
}

export function apiPut<T = any>(
  resource: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return axiosInstance.put<T>(resource, data, config);
}

export function apiDelete<T = any>(
  resource: string,
  config?: AxiosRequestConfig
) {
  return axiosInstance.delete<T>(`${resource}`, config);
}

export async function apiUpload<T = any>(
  resource: string,
  data?: any,
  config?: AxiosRequestConfig,
  progressCallback?: (progress: number) => void
) {
  return axiosInstance.post<T>(resource, data, {
    ...config,
    headers: {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }
    // onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
    //   const uploadPercentage = parseInt(
    //     Math.round(
    //       (progressEvent.loaded / progressEvent.total) * 100
    //     ).toString()
    //   );
    //   progressCallback && progressCallback(uploadPercentage);
    // }
  });
}
