import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.schedule.url;

const scheduleApi = {
  fetchSchedules: (classId, params) => {
    const url = `${settings.api.endpoints.classes.url}/${classId}/schedules`;
    return axiosClient.get(url, { params });
  },

  addSchedule: (schedule) => {
    return axiosClient.post(BASE_URL, schedule);
  },

  updateSchedule: (id, schedule) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, schedule);
  },

  deleteSchedule: (id) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.delete(url);
  },
};

export default scheduleApi;
