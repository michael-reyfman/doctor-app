import {auth} from '../constants';
import serverRequest from '../helpers/serverRequest'

export const login = (email, password) => dispatch => {
	dispatch({
		type: auth.AUTH_START
	});
	const queryString = `
	{
		authenticateDoctor(email: "${email}", password: "${password}") {
	      _id
	      firstName
	      lastName
	      patronymic
	    }
  }
  `;
	serverRequest('query', queryString)
		.then(res => {
			dispatch({
				type: auth.AUTH_SUCCESS,
				payload: res.authenticateDoctor
			})
		})
		.catch(err => {
			dispatch({
				type: auth.AUTH_FAIL
			})
		})
};

export const logout = () => ({
	type: auth.LOGOUT
});

export const signUp = credentials => dispatch => {
	dispatch({
		type: auth.SIGN_UP_START
	});

	const queryString = `
		mutation {
			newDoctor(
				firstName: "${credentials.firstName}",
				lastName: "${credentials.lastName}",
				patronymic: "${credentials.patronymic}",
				email: "${credentials.email}",
				password: "${credentials.password}",
				phone: "${credentials.phone}",
				hospital: "${credentials.hospital}",
				${credentials.description && `description: "${credentials.description}"`}
				${credentials.dateOfBirth && `dateOfBirth: "${credentials.dateOfBirth}"`}
				${credentials.gender && `gender: "${credentials.gender}"`}
				) { firstName}
		}
	`;
	serverRequest('mutation', queryString)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.error(err);
		})
};