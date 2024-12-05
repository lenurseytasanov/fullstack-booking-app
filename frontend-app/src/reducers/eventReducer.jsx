const initialState = {
	events: [],
	event: {},
	loading: false,
	error: null,
 };
 
 const eventReducer = (state = initialState, action) => {
	switch (action.type) {
	  case 'GET_EVENTS':
		 return { ...state, events: action.events, loading: false };
	  case 'GET_EVENT':
		 return { ...state, event: action.event, loading: false };
	  case 'CREATE_EVENT':
		 return { ...state, events: [...state.events, action.event], loading: false };
	  case 'UPDATE_EVENT':
		 return { ...state, event: action.event, loading: false };
	  case 'DELETE_EVENT':
		 return { ...state, events: state.events.filter((event) => event.id !== action.id), loading: false };
	  case 'LOADING':
		 return { ...state, loading: true };
	  case 'ERROR':
		 return { ...state, error: action.error, loading: false };
	  default:
		 return state;
	}
 };
 
 export default eventReducer;