import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.levels.url;

const levelApi = {
  fetchLevels: () => {
    return axiosClient.get('/levels');
  },

  fetchLevel: (slug) => {
    const url = `/levels/${slug}`;
    return axiosClient.get(url);
  },

  addLevel: (level) => {
    return axiosClient.post(BASE_URL, level);
  },

  updateLevel: (id, level) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, level);
  },

  deleteLevel: (id) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.delete(url);
  },

  updateLevelImage: (id, image) => {
    const url = `${BASE_URL}/${id}/image`;
    return axiosClient.put(url, image);
  },
};

export default levelApi;
