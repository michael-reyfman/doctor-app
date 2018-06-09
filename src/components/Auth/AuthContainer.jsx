import Auth from './Auth';
import {connect} from 'react-redux';
import {login, logout} from '../../actions/auth';

const mapStateToProps = state => {
	const {auth} = state;
	return {
		isAuth: auth.isAuth,
		authPending: auth.authPending,
		firstName: auth.data.firstName,
		lastName: auth.data.lastName
	}
};

const mapDispatchToProps = dispatch => ({
	authenticate: (email, password) => dispatch(login(email, password)),
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);