const initialState = {
	participants: [],
	currentParticipant: null,
	loading: false,
	error: null
 };
 
 const registerReducer = (state = initialState, action) => {
	switch (action.type) {
	  case 'CREATE_PARTICIPANT':
		 return {
			...state,
			participants: [...state.participants, action.payload],
			loading: false
		 };
		 
	  case 'GET_PARTICIPANTS':
		 return {
			...state,
			participants: action.payload,
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
 
 export default registerReducer;
 