import { UPLOAD_FILE, GET_FILE} from './types';

export const uploadFile = (file) => ({
  type: UPLOAD_FILE,
  payload: file
});

export const getFile = (fileId) => ({
  type: GET_FILE,
  payload: fileId
});
