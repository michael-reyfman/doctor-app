import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Patients from '../Patients';

import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class Main extends Component {
	render() {
		const {classes, isAuth} = this.props;
		return(
			<div className={classes.root}>
				{
					isAuth ?
						<Patients /> :
						<div>
							<Typography variant="headline">Главная страница</Typography>
							<Typography variant="body">Вот эта страница показывается для неавторизованных холопов. Пожалуйста, войдите или зарегистрируйтесь.</Typography>
						</div>
				}

			</div>
		)
	}
}

export default withStyles(styles)(Main);