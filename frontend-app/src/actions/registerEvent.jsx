import { CREATE_PARTICIPANT, LOADING, ERROR } from './types';

export const registerParticipant = (eventId, participantData) => ({
  type: CREATE_PARTICIPANT,
  payload: { eventId, data: participantData }
});

export const setLoading = () => ({
  type: LOADING
});

export const setError = (error) => ({
  type: ERROR,
  payload: error
});
