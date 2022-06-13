import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.users.url;

const userApi = {
  fetchUsers: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },

  fetchVideo: (slug) => {
    const url = `/videos/${slug}`;
    return axiosClient.get(url);
  },

  addUser: (user) => {
    return axiosClient.post(`${BASE_URL}/new-user`, user);
  },

  deleteUser: (id) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.delete(url);
  },

  updateAdminRole: (id) => {
    const url = `${BASE_URL}/${id}/admin-role`;
    return axiosClient.put(url);
  },

  updateUserRoles: (id, roles) => {
    const url = `${BASE_URL}/${id}/update-roles`;
    return axiosClient.put(url, roles);
  },

  updateUserStatus: (userStatus) => {
    const url = `${BASE_URL}/status`;
    return axiosClient.put(url, userStatus);
  },
};

export default userApi;
