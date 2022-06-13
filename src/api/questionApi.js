import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.questions.url;

const questionApi = {
  fetchQuestions: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },

  updateQuestion: (id, question) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, question);
  },

  updateQuestionImage: (id, image) => {
    const url = `${BASE_URL}/${id}/image`;
    return axiosClient.put(url, image);
  },

  updateQuestionAudio: (id, audio) => {
    const url = `${BASE_URL}/${id}/audio`;
    return axiosClient.put(url, audio);
  },
};

export default questionApi;
