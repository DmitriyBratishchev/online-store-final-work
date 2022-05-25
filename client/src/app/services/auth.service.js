import axios from 'axios';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
  baseURL: process.env.REACT_APP_API_NODE_SERVER + '/auth/'
});

const authService = {
  login: async (payload) => {
    const data = await httpAuth.post('signInWithPassword', payload);
    return data;
  },
  register: async (payload) => {
    const data = await httpAuth.post('signUp', payload);
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
