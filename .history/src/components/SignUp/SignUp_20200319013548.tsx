import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import styles from './SignUp.module.css';
import { connect } from 'react-redux';
import { registration } from '../../redux/actions/actions';
import { signUpUser } from '../../api/aws-cognito';
import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';
import { defaultState } from '../../redux/actions/actions';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = (props: any) => {
	const classes = useStyles();
	const [firstName, changeFirstName] = useState('');
	const [email, changeEmail] = useState('');
	const [pass, changePass] = useState('');
	const [onClickSignUp, changeOnClickSignUp] = useState(false);
	const [incorrectFirstName, setIncorrectFirstName] = useState('');
	const [incorrectEmail, setIncorrectEmail] = useState('');
	const [incorrectPass, setIncorrectPass] = useState('');
	let history = useHistory();


	useEffect(() => {
		if (onClickSignUp) {
			props.defaultState();
			setIncorrectFirstName('');
			setIncorrectEmail('');
			setIncorrectPass('');
			let mark = false;
			if (firstName == '') {
				setIncorrectFirstName('This field cannot be null!');
				mark = true;
			}
			if (email == '') {
				setIncorrectEmail('This field cannot be null!');
				mark = true;
			} else if (email.indexOf('@') == -1) {
				setIncorrectEmail('Email entered incorrectly!');
				mark = true;
			}
			if (pass == '') {
				setIncorrectPass('This field cannot be null!');
				mark = true;
			}
			if (!mark)
				Auth.signUp({
					username: email,
					password: pass,
					attributes: { name: firstName },
				}).then(
					success => {
						props.registration(true);
						history.push('/signin');
					},
					error => {
						setIncorrectPass(error.message);
						props.registration(false);
					}
				);
			changeOnClickSignUp(false);
		}
	}, [onClickSignUp]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={e => changeFirstName(e.target.value)}
								value={firstName}
								helperText={incorrectFirstName}
								error={incorrectFirstName !== ''}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={e => changeEmail(e.target.value)}
								value={email}
								helperText={incorrectEmail}
								error={incorrectEmail !== ''}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={e => changePass(e.target.value)}
								value={pass}
								helperText={incorrectPass}
								error={incorrectPass !== ''}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={e => {
							e.preventDefault();
							changeOnClickSignUp(true);
						}}
					>
						Sign Up
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<NavLink to="/signin">
								<div className={styles.a}>Already have an account? Sign in </div>
							</NavLink>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default connect(null, {
	registration,
	defaultState,
})(SignUp);
