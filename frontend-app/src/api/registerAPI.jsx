import axios from 'axios';

const BASE_URL = '/api/v1';

const registerAPI = {
  signUpForMeeting: async (eventId, data) => {
    const response = await axios.post(`${BASE_URL}/events/${eventId}/participants`, data);
    return response.data;
  }
};

export default registerAPI;
