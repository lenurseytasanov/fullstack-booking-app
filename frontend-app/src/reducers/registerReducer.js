const initialState = {
	registers: [],
	register: {},
	loading: false,
	error: null,
 };
 
 const registerReducer = (state = initialState, action) => {
	switch (action.type) {
	  case 'GET_REGISTERS':
		 return { ...state, registers: action.registers, loading: false };
	  case 'GET_REGISTER':
		 return { ...state, register: action.register, loading: false };
	  case 'CREATE_REGISTER':
		 return { ...state, registers: [...state.registers, action.register], loading: false };
	  case 'UPDATE_REGISTER':
		 return { ...state, register: action.register, loading: false };
	  case 'DELETE_REGISTER':
		 return { ...state, registers: state.registers.filter((register) => register.id !== action.id), loading: false };
	  case 'LOADING':
		 return { ...state, loading: true };
	  case 'ERROR':
		 return { ...state, error: action.error, loading: false };
	  default:
		 return state;
	}
 };
 
 export default registerReducer;