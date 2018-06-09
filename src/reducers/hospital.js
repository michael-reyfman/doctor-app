import { hospital } from '../constants'

const initialState = {
	hospitals: [],
	isFetch: false,
	isInit: false
};

const hospitalReducer = (state = initialState, action) => {
	switch(action.type) {
		case hospital.FETCH_START:
			return {...state, isFetch: true};
		case hospital.FETCH_SUCCESS:
			return {...state, isFetch: false, isInit: false, hospitals: action.payload};
		case hospital.FETCH_FAIL:
			return {...state, isFetch: false, isInit: false};
		default:
			return state
	}
};

export default hospitalReducer;