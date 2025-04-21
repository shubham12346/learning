import axios from 'axios';
import { SERVER_API_URL } from '../../shared/constants/constants';

const axiosInstance = axios.create({
  baseURL: SERVER_API_URL
});

axiosInstance.interceptors.request.use(
  (request) => {
    const access_token = localStorage.getItem('accessToken');
    if (access_token) {
      request.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
