import { GET_REGISTERS, CREATE_REGISTER, UPDATE_REGISTER, DELETE_REGISTER } from './types';

export const getRegisters = () => {
  return {
    type: GET_REGISTERS,
    payload: {},
  };
};

export const createRegister = (data) => {
  return {
    type: CREATE_REGISTER,
    payload: data,
  };
};

export const updateRegister = (id, data) => {
  return {
    type: UPDATE_REGISTER,
    payload: { id, data },
  };
};

export const deleteRegister = (id) => {
  return {
    type: DELETE_REGISTER,
    payload: { id },
  };
};