import axios from 'axios';
import config from '../configFile.json';

// baseURL: config.apiJsonServer

const http = axios.create({
  baseURL: config.apiNodeServer
});

http.interceptors.request.use((req) => {
  console.log('interceptor req', req);
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
