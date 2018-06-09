const initialState = {
	isAuth: false,
	authPending: false,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'AUTH_START':
			return {...state, authPending: true}
		case 'AUTH_SUCCESS':

		default:
			return state;
	}
};

export default rootReducer;