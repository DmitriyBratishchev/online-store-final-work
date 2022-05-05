import axios from 'axios';
import config from '../configFile.json';
import authService from './auth.service';
import localStorageService from './localStorage.service';

// baseURL: config.apiJsonServer

const http = axios.create({
  baseURL: config.apiNodeServer
});

http.interceptors.request.use(async (req) => {
  console.log('interceptor req', req);
  // if (req.url.includes('auth')) {
  const expiresDate = localStorageService.getTokenExpiresDate();
  const refreshToken = localStorageService.getRefreshToken();
  const isExpired = refreshToken && expiresDate < Date.now();

  if (isExpired) {
    console.log('refresh token servece', refreshToken, expiresDate, expiresDate < Date.now());
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
  // }

  return req;
}, (error) => {
  console.log('interceptor req error', error);
});

http.interceptors.response.use((res) => {
  console.log('intercepror res', res);
  return res;
}, (error) => {
  console.log('interceptor error', error);
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
};
export default httpService;
