import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.me.url;

const meApi = {
  fetchNameRoles: () => {
    return axiosClient.get(`${BASE_URL}/role`);
  },
  
  fetchProfile: () => {
  const url = '/me';
  return axiosClient.get(url);
},
};


export default meApi;
