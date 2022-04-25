import axios from 'axios';
// import localStorageService from './localStorage.service';
import configFile from '../configFile.json';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
  baseURL: configFile.apiNodeServer + '/auth/'
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post('signUp', payload);
    console.log('auth register data', data);
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};

export default authService;
