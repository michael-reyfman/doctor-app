import Main from './Main'
import {connect} from 'react-redux'

const mapStateToProps = state => {
	const {auth} = state
	return {
		isAuth: auth.isAuth,
	}
};

export default connect(mapStateToProps)(Main)