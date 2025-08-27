'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = false;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (refreshing) return Promise.reject(error);
      original._retry = true;
      refreshing = true;
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            refreshToken: Cookies.get('refresh_token'),
          },
          { withCredentials: true },
        );
        Cookies.set('access_token', data.accessToken, { sameSite: 'lax' });
        refreshing = false;
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        Cookies.remove('access_token');
        Cookies.remove('user_role');
        Cookies.remove('refresh_token');
        window.location.replace('/login');
        refreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
