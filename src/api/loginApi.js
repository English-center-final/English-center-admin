import settings from 'app/settings';
import axiosClient from './axiosClient';

const loginApi = {
  login: (username, password) => {
    return axiosClient.post(settings.api.endpoints.auth.url, {
      username,
      password,
    });
  },
};

export default loginApi;
