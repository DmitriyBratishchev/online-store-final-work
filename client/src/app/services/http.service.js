import axios from 'axios';
import config from '../configFile.json';
import authService from './auth.service';
import localStorageService from './localStorage.service';

const http = axios.create({
  baseURL: config.apiNodeServer
});

http.interceptors.request.use(async (req) => {
  const expiresDate = localStorageService.getTokenExpiresDate();
  const refreshToken = localStorageService.getRefreshToken();
  const isExpired = refreshToken && expiresDate < Date.now();

  if (isExpired) {
    const data = await authService.refresh();
    localStorageService.setTokens(data);
  }
  const accessToken = localStorageService.getAccessToken();
  if (accessToken) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return req;
}, (error) => {
  return error;
});

http.interceptors.response.use((res) => {
  return res;
}, (error) => {
  return error;
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
};
export default httpService;
