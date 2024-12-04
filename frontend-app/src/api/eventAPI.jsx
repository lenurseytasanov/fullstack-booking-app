import axios from 'axios';

const eventAPI = {
  getEvents: async () => {
    const response = await axios.get('/api/events');
    return response.data;
  },

  getEvent: async (id) => {
    const response = await axios.get(`/api/events/${id}`);
    return response.data;
  },

  createEvent: async (data) => {
    const response = await axios.post('/api/events', data);
    return response.data;
  },

  updateEvent: async (id, data) => {
    const response = await axios.put(`/api/events/${id}`, data);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await axios.delete(`/api/events/${id}`);
    return response.data;
  },
};

export default eventAPI;