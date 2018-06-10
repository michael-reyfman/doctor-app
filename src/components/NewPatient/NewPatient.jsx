import React, {Component} from 'react'

import MaskedInput from 'react-text-mask'

import { withStyles } from '@material-ui/core/styles'

import serverRequest from '../../helpers/serverRequest'

import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const styles = {
	root: {
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 5px',
	},
	textField: {
		width: "33%",
		minWidth: 280,
	}
};

const phoneInput = props => {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={inputRef}
			mask={['+','3','8','(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
};

class NewPatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			patronymic: '',
			dateOfBirth: '',
			gender: 'male',
			email: '',
			password: '',
			description: '',
			phone: '+38(  )   -  -  ',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		})
	};

	handleSignUp() {
		const credentials = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			patronymic: this.state.patronymic,
			email: this.state.email,
			password: this.state.password,
			phone: this.state.phone,
			description: this.state.description,
			dateOfBirth: this.state.dateOfBirth,
			gender: this.state.gender,
			doctorId: this.props.doctorId
		};
		const queryString = `
			mutation {
				newPatient(
					firstName: "${credentials.firstName}",
					lastName: "${credentials.lastName}",
					patronymic: "${credentials.patronymic}",
					email: "${credentials.email}",
					password: "${credentials.password}",
					phone: "${credentials.phone}",
					doctorId: "${credentials.doctorId}",
					${credentials.description && `description: "${credentials.description}"`}
					${credentials.dateOfBirth && `dateOfBirth: "${credentials.dateOfBirth}"`}
					${credentials.gender && `gender: "${credentials.gender}"`}
				) { firstName}
			}
		`;
		serverRequest('mutation', queryString).then(res => console.log(res));
		console.log(queryString);
	}

	render() {
		const {classes, isAuth} = this.props;
		return (
			isAuth ? (
			<div className={classes.root}>
				<Typography variant="headline" align="center">Регистрация нового пациента</Typography>
				<form className={classes.form}>
					<TextField
						required
						label="Фамилия"
						className={classes.textField}
						value={this.state.lastName}
						onChange={this.handleChange('lastName')}
						margin="normal"
					/>
					<TextField
						required
						label="Имя"
						className={classes.textField}
						value={this.state.firstName}
						onChange={this.handleChange('firstName')}
						margin="normal"
					/>
					<TextField
						required
						label="Отчество"
						className={classes.textField}
						value={this.state.patronymic}
						onChange={this.handleChange('patronymic')}
						margin="normal"
					/>
					<TextField
						required
						label="Адрес электронной почты"
						className={classes.textField}
						value={this.state.email}
						type="email"
						onChange={this.handleChange('email')}
						margin="normal"
					/>
					<TextField
						required
						label="Пароль"
						className={classes.textField}
						value={this.state.password}
						type="password"
						onChange={this.handleChange('password')}
						margin="normal"
					/>
					<FormControl className={classes.formControl} margin="normal" required>
						<InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
						<Input
							value={this.state.phone}
							onChange={this.handleChange('phone')}
							id="formatted-text-mask-input"
							inputComponent={phoneInput}
							className={classes.textField}
						/>
					</FormControl>
					<TextField
						required
						label="Дата рождения"
						className={classes.textField}
						value={this.state.dateOfBirth}
						type="date"
						onChange={this.handleChange('dateOfBirth')}
						defaultValue="2018=06-09"
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						multiline
						label="Описание"
						rows={4}
						className={classes.textField}
						value={this.state.description}
						onChange={this.handleChange('description')}
						margin="normal"
					/>
					<Button color="secondary" onClick={this.handleSignUp}>
						Регистрация
					</Button>
				</form>
			</div>
		)
			:
				<div className={classes.root}>
					<Typography variant="headline" align="center">Регистрация нового пациента</Typography>
					<Typography variant="subheading" color="primary">Уважаемый доктор, вы не вошли в систему! Просим сделать это прямо сейчас на верхней навигационной панели.</Typography>
				</div>
		)
	}
}

export default withStyles(styles)(NewPatient)