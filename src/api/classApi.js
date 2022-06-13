import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.classes.url;

const classApi = {
  fetchClasses: (params) => {
    return axiosClient.get('/classes', { params });
  },

  fetchClassById: (classId) => {
    return axiosClient.get(`${BASE_URL}/${classId}`);
  },

  addClass: (classes) => {
    return axiosClient.post(BASE_URL, classes);
  },

  updateClass: (classId, classes) => {
    return axiosClient.put(`${BASE_URL}/${classId}`, classes);
  },

  deleteClass: (classId) => {
    const url = `${BASE_URL}/${classId}`;
    return axiosClient.delete(url);
  },

  fetchUserClasses: (params) => {
    return axiosClient.get(`${BASE_URL}/register`, { params });
  },

  addUserClass: (userClasses) => {
    return axiosClient.post(`${BASE_URL}/register`, userClasses);
  },

  updateUserClass: (userClasses) => {
    return axiosClient.put(`${BASE_URL}/register`, userClasses);
  },

  deleteUserClass: (userClasses) => {
    return axiosClient.delete(`${BASE_URL}/register`, {
      data: userClasses,
    });
  },
};

export default classApi;
