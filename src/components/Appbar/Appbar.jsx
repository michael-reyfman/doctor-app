import React, { Component } from 'react';

import Auth from '../Auth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom: 20,
	},
	flex: {
		flex: 1,
	}
};

class Appbar extends Component {
	render() {
		const {classes} = this.props;
		return(
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<div className={classes.flex}>&nbsp;</div>
						<Auth />
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default withStyles(styles)(Appbar);