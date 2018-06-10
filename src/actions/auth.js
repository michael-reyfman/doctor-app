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
	      email
	      phoneNumbers
	      patients {
	        _id
	        firstName
	        lastName
	        patronymic
	        dateOfBirth
	        email
	        phoneNumbers
	        gender
	        description
	      }
	    }
  }
  `;
	serverRequest('query', queryString)
		.then(res => {
			const normalized = res.authenticateDoctor;
			dispatch({
				type: auth.AUTH_SUCCESS,
				payload: normalized
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