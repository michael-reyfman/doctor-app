import React, {Component} from 'react'

import MaskedInput from 'react-text-mask'

import { withStyles } from '@material-ui/core/styles'

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
		padding: '0 20px',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	textField: {
		width: "50%",
		minWidth: 280,
	}
};

const phoneInput = props => {
	const { inputRef, classes, ...other } = props;

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

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			patronymic: '',
			dateOfBirth: '',
			gender: 'male',
			hospitalId: '',
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
			hospital: this.state.hospitalId,
			description: this.state.description,
			dateOfBirth: this.state.dateOfBirth,
			gender: this.state.gender,
		};
		this.props.signUp(credentials);
	}

	componentDidMount() {
		this.props.fetchHospitals()
	}

	render() {
		const { classes, isFetch, hospitals } = this.props;
		return(
			isFetch ? <CircularProgress/> :
			<div className={classes.root}>
				<Typography variant="headline" align="center">Регистрация нового доктора</Typography>
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
					<FormControl className={classes.formControl} required>
						<InputLabel htmlFor="age-simple">Лечебное заведение</InputLabel>
						<Select
							value={this.state.hospitalId}
							onChange={this.handleChange('hospitalId')}
							inputProps={{
								name: 'hospital-dd',
								id: 'hospital',
							}}
							className={classes.textField}
						>
							<MenuItem value="">
								<em>-----</em>
							</MenuItem>
							{hospitals.map(hospital => <MenuItem key={hospital._id} value={hospital._id}>{hospital.title}</MenuItem>)}
						</Select>
					</FormControl>
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
						onChange={this.handleChange('password')}
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
	}
}

export default withStyles(styles)(SignUp);