import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.words.url;

const wordApi = {
  fetchWordsByCourse: (params) => {
    return axiosClient.get('/course-words', { params });
  },
  fetchWords: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },

  addWord: (word) => {
    return axiosClient.post(BASE_URL, word);
  },

  updateWord: (id, word) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, word);
  },

  deleteWord: (id) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.delete(url);
  },

  updateWordImage: (id, image) => {
    const url = `${BASE_URL}/${id}/image`;
    return axiosClient.put(url, image);
  },

  updateWordSound: (id, sound) => {
    const url = `${BASE_URL}/${id}/sound`;
    return axiosClient.put(url, sound);
  },
};

export default wordApi;
