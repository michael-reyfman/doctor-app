import { auth } from '../constants'

const initialState = {
	isAuth: false,
	authPending: false,
	data: {},
	signUpPending: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case auth.AUTH_START:
			return {...state, authPending: true};
		case auth.AUTH_SUCCESS:
			return {...state, isAuth: true, authPending: false, data: action.payload};
		case auth.AUTH_FAIL:
			return {...state, isAuth: false, authPending: false};
		case auth.LOGOUT:
			return {...state, isAuth: false, authPending: false};
		case auth.SIGN_UP_START:
			return {...state, signUpPending: true};
		case auth.SIGN_UP_SUCCESS:
		case auth.SIGN_UP_FAIL:
			return {...state, signUpPending: false};
		default:
			return state;
	}
};

export default authReducer;