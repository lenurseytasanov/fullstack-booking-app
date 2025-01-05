const initialState = {
  files: [],
  currentFile: null,
  loading: false,
  error: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_FILE':
      return {
        ...state,
        files: [...state.files, action.payload],
        loading: false
      };
    case 'GET_FILE':
      return {
        ...state,
        currentFile: action.payload,
        loading: false
      };
    case 'LOADING':
      return { ...state, loading: true };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default fileReducer;
