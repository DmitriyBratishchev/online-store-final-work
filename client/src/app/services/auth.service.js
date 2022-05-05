import axios from 'axios';
import configFile from '../configFile.json';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
  baseURL: configFile.apiNodeServer + '/auth/'
});

const authService = {
  login: async (payload) => {
    const data = await httpAuth.post('signInWithPassword', payload);
    // console.log('auth login data', data);
    return data;
  },
  register: async (payload) => {
    // console.log('signUp start, payload: ', payload);
    const data = await httpAuth.post('signUp', payload);
    // console.log('auth register data', data);
    return data;
  },
  refresh: async () => {
    // console.log('servese refresh', localStorageService.getRefreshToken());
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    });
    // console.log('servese refresh data:', data);
    return data;
  }
};

export default authService;
