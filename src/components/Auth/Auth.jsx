import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		padding: 15,
	},
	textField: {
		// marginLeft: theme.spacing.unit,
		// marginRight: theme.spacing.unit,
		// width: '100%',
	},
	menu: {
		marginTop: 48,
	},
	content: {
		padding: 15,
		outline: 'none',
	},
	signup: {
	}
});

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			accountMenuAnchorEl: null,
			authMenuAnchorEl: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleAuthenticate = this.handleAuthenticate.bind(this);
	}

	handleAuthenticate() {
		this.props.authenticate(this.state.email, this.state.password);
		this.setState({
			email: '',
			password: ''
		})
	}

	handleMenu = name => event => {
		this.setState({ [name]: event.currentTarget });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		})
	};

	handleClose = name => e => {
		this.setState({ [name]: null });
	};

	render() {
		const {classes, isAuth, logout, firstName, lastName} = this.props;
		const authMenuOpen = Boolean(this.state.authMenuAnchorEl);
		const accountMenuOpen = Boolean(this.state.accountMenuAnchorEl);
		return (
				isAuth ?
					(
						<div>
							<IconButton
								color="inherit"
								aria-owns={accountMenuOpen ? 'menu-appbar-account' : null}
								aria-haspopup="true"
								onClick={this.handleMenu('accountMenuAnchorEl')}
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar-account"
								open={accountMenuOpen}
								anchorEl={this.state.accountMenuAnchorEl}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								className={classes.menu}
								onClose={this.handleClose('accountMenuAnchorEl')}
							>
								<div className={classes.content}>
									<Typography variant="title">Добро пожаловать, {firstName} {lastName}!</Typography>
									<Button
										color="secondary"
										onClick={() => console.log('settings')}
									>
										Настройки
									</Button>
									<Button
										color="secondary"
										onClick={logout}
									>
										Выйти
									</Button>
								</div>
							</Menu>
						</div>
					)
						:
					(
						<div>
							<Button
								color="inherit"
								aria-owns={authMenuOpen ? 'menu-appbar-auth' : null}
								aria-haspopup="true"
								onClick={this.handleMenu('authMenuAnchorEl')}
							>
								Войти
							</Button>
							<Menu
								id="menu-appbar-auth"
								open={authMenuOpen}
								anchorEl={this.state.authMenuAnchorEl}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								className={classes.menu}
								onClose={this.handleClose('authMenuAnchorEl')}
							>
								<form className={classes.form} noValidate>
									<TextField
										required
										id="e-mail"
										label="e-mail"
										type="e-mail"
										className={classes.textField}
										value={this.state.email}
										onChange={this.handleChange('email')}
										margin="normal"
									/>
									<TextField
										required
										id="password"
										label="Пароль"
										type="password"
										className={classes.textField}
										value={this.state.password}
										onChange={this.handleChange('password')}
										margin="normal"
									/>
									<Link to='/main' style={{textDecoration: 'none'}}>
										<Button
											color="secondary"
											onClick={this.handleAuthenticate}
										>
											Войти в систему
										</Button>
									</Link>
									<Typography variant="body2" className={classes.signup}>
										Нет аккаунта? <Link to='/signup' style={{textDecoration: 'none'}}>Зарегистрируйтесь!</Link>
									</Typography>
								</form>
							</Menu>
						</div>
					)
		)
	}
}

export default withStyles(styles)(Auth);