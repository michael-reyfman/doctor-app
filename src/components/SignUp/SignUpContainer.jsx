import SignUp from './SignUp'
import {connect} from 'react-redux';
import {fetchHospitals} from '../../actions/hospital';
import {signUp} from "../../actions/auth";

const mapStateToProps = state => {
	const {hospital} = state;
	return {
		isFetch: hospital.isFetch,
		hospitals: hospital.hospitals,
	}
};

const mapDispatchToProps = dispatch => ({
	fetchHospitals: () => dispatch(fetchHospitals()),
	signUp: credentials => dispatch(signUp(credentials)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)