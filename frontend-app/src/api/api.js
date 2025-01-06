import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  events: {
    create: (data) => instance.post('/events', data),
    getAll: () => instance.get('/events'),
    getById: (id) => instance.get(`/events/${id}`),
    update: (id, data) => instance.put(`/events/${id}`, data),
    delete: (id) => instance.delete(`/events/${id}`),
    getParticipants: (id, page = 0, size = 10) => instance.get(`/events/${id}/participants`, {
      params: { page, size }
    }),
    addParticipant: (id, data) => instance.post(`/events/${id}/participants`, data)
  },

  files: {
    upload: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return instance.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    getFile: (id) => instance.get(`/files/${id}`)
  }
};
