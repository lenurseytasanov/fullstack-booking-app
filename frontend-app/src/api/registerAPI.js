import axios from 'axios';

const registerAPI = {
  getRegisters: async () => {
    const response = await axios.get('/api/registers');
    return response.data;
  },

  getRegister: async (id) => {
    const response = await axios.get(`/api/registers/${id}`);
    return response.data;
  },

  createRegister: async (data) => {
    const response = await axios.post('/api/registers', data);
    return response.data;
  },

  updateRegister: async (id, data) => {
    const response = await axios.put(`/api/registers/${id}`, data);
    return response.data;
  },

  deleteRegister: async (id) => {
    const response = await axios.delete(`/api/registers/${id}`);
    return response.data;
  },
};

export default registerAPI;