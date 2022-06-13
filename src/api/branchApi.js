import settings from 'app/settings';
import axiosClient from './axiosClient';

const BASE_URL = settings.api.endpoints.branches.url;

const branchApi = {
  fetchBranches: () => {
    return axiosClient.get('/branches');
  },

  addBranch: (branch) => {
    return axiosClient.post(BASE_URL, branch);
  },

  updateBranch: (id, branch) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, branch);
  },

  deleteBranch: (id) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.delete(url);
  },
};

export default branchApi;
