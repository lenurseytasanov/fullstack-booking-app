import axios from 'axios';

const BASE_URL = '/api/v1';

const fileAPI = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/files`, formData);
    return response.data;
  },

  getFile: async (fileId) => {
    const response = await axios.get(`${BASE_URL}/files/${fileId}`);
    return response.data;
  }
};

export default fileAPI;
