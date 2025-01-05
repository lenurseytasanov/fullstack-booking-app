const initialState = {
	events: [],
	currentEvent: null,
	participants: [],
	loading: false,
	error: null
 };
 
 const eventReducer = (state = initialState, action) => {
	switch (action.type) {
	  case 'GET_EVENTS':
		 return { 
			...state, 
			events: action.payload,
			loading: false 
		 };
		 
	  case 'GET_EVENT':
		 return { 
			...state, 
			currentEvent: action.payload,
			loading: false 
		 };
		 
	  case 'CREATE_EVENT':
		 return { 
			...state, 
			events: [...state.events, action.payload],
			loading: false 
		 };
		 
	  case 'UPDATE_EVENT':
		 return {
			...state,
			events: state.events.map(event => 
			  event.id === action.payload.id ? action.payload.data : event
			),
			loading: false
		 };
		 
	  case 'DELETE_EVENT':
		 return {
			...state,
			events: state.events.filter(event => event.id !== action.payload),
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
 
 export default eventReducer;
 