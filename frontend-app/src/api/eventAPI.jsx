import axios from 'axios';

const BASE_URL = '/api/v1';

const eventAPI = {
  getEvents: async () => {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  },

  getEvent: async (id) => {
    const response = await axios.get(`${BASE_URL}/events/${id}`);
    return response.data;
  },

  createEvent: async (data) => {
    const response = await axios.post(`${BASE_URL}/events`, data);
    return response.data;
  },

  updateEvent: async (id, data) => {
    const response = await axios.put(`${BASE_URL}/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id) => {
    await axios.delete(`${BASE_URL}/events/${id}`);
  },

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/files`, formData);
    return response.data;
  },

  getParticipants: async (eventId, page = 0, size = 10) => {
    const response = await axios.get(`${BASE_URL}/events/${eventId}/participants`, {
      params: { page, size }
    });
    return response.data;
  }
};

export default eventAPI;
