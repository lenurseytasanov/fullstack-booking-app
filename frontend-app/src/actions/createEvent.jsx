import { GET_EVENTS, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './types';

export const getEvents = () => {
  return {
    type: GET_EVENTS,
    payload: {},
  };
};

export const createEvent = (data) => {
  return {
    type: CREATE_EVENT,
    payload: data,
  };
};

export const updateEvent = (id, data) => {
  return {
    type: UPDATE_EVENT,
    payload: { id, data },
  };
};

export const deleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    payload: { id },
  };
};