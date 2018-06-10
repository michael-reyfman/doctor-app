import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import MessageIcon from '@material-ui/icons/Message'
import AddIcon from '@material-ui/icons/Add'

import red from '@material-ui/core/colors/red'
import purple from '@material-ui/core/colors/blue'

import {Link} from 'react-router-dom'

import format from 'date-fns/format'

const styles = {
	avatar: {
		background: red[600],
		width: 48,
		height: 48,
	},
	cards: {
		display: 'grid',
		gridColumnGap: '20px',
		gridRowGap: '20px',
		gridTemplateColumns: 'auto auto auto',
		'@media (max-width: 1024px)': {
			gridTemplateColumns: 'auto auto',
		},
		'@media (max-width: 767px)': {
			gridTemplateColumns: 'auto',
		}
	},
	addPatient: {
		width: 18,
		height: 18,
		marginLeft: 12,
		background: red[500],
		color: '#fff'
	},
	addPatientIcon: {
		width: 12,
		height: 12,
	},
	sendMessage: {
		background: purple[700],
		color: '#fff',
		width: 32,
		height: 32,
	},
	icon: {
		width: 18,
		height: 18,
	}
};

const formInitials = (firstName, lastName, patronymic) => `${lastName[0]}${firstName[0]}${patronymic[0]}`;

const normalizePatient = patient => {
	patient.gender = patient.gender === 'male' ? 'мужской' : 'женский';
	patient.dateOfBirth = format(patient.dateOfBirth, 'DD.MM.YYYY');
	return patient
};

class Patients extends Component {
	render() {
		const {classes, patients} = this.props;
		console.log(patients);
		return(
			<div className={classes.root}>
				<Typography variant="headline">
					Мои пациенты
					<Link to='/newpatient'>
						<IconButton className={classes.addPatient}>
							<AddIcon className={classes.addPatientIcon} />
						</IconButton>
					</Link>
				</Typography>
				<div className={classes.cards}>
					{
						patients
							.map(patient => normalizePatient(patient))
							.map(patient => (
							<Card className={classes.card} key={patient._id}>
								<CardHeader
									title={`${patient.lastName} ${patient.firstName} ${patient.patronymic}`}
									avatar={
										<Avatar className={classes.avatar}>
											{formInitials(patient.firstName, patient.lastName, patient.patronymic)}
											</Avatar>
									}
								/>
								<CardContent>
									<Typography><b>Дата рождения:</b> {patient.dateOfBirth}</Typography>
									<Typography><b>Пол:</b> {patient.gender}</Typography>
									<Typography><b>Электронная почта:</b> {patient.email}</Typography>
									<Typography><b>Номера телефонов:</b> {patient.phoneNumbers.join(', ')}</Typography>
									<Typography><b>О себе:</b> {patient.description}</Typography>
								</CardContent>
								<CardActions>
									<IconButton
										className={classes.sendMessage}
										onClick={() => console.log('clicked')}
										aria-label="Написать сообщение"
									>
										<MessageIcon className={classes.icon} />
									</IconButton>
								</CardActions>
							</Card>
						))
					}
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Patients);