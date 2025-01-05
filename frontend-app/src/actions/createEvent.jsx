import { GET_EVENTS, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, LOADING, ERROR } from './types';

export const getEvents = () => ({
  type: GET_EVENTS
});

export const createEvent = (eventData) => ({
  type: CREATE_EVENT,
  payload: eventData
});

export const updateEvent = (id, eventData) => ({
  type: UPDATE_EVENT,
  payload: { id, data: eventData }
});

export const deleteEvent = (id) => ({
  type: DELETE_EVENT,
  payload: id
});

export const setLoading = () => ({
  type: LOADING
});

export const setError = (error) => ({
  type: ERROR,
  payload: error
});
