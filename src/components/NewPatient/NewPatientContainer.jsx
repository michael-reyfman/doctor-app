import NewPatient from './NewPatient'
import {connect} from 'react-redux'

const mapStateToProps = state => {
	const {auth} = state
	return {
		isAuth: auth.isAuth,
		doctorId: auth.data._id,
	}
};

export default connect(mapStateToProps)(NewPatient);