import Patients from './Patients'
import {connect} from 'react-redux'

const mapStateToProps = state => {
	const {auth} = state;
	return {
		patients: auth.data.patients || [],
	}
};

export default connect(mapStateToProps)(Patients)