import {hospital} from '../constants';
import serverRequest from '../helpers/serverRequest'

export const fetchHospitals = () => dispatch => {
	dispatch({
		type: hospital.FETCH_START
	});
	const queryString = `
		{
			allHospitals {
				_id,
				title,
			}
		}
	`;
	serverRequest('query', queryString)
		.then(res => {
			dispatch({
				type: hospital.FETCH_SUCCESS,
				payload: res.allHospitals
			})
		})
		.catch(err => {
			dispatch({
				type: hospital.FETCH_FAIL
			})
		})
};