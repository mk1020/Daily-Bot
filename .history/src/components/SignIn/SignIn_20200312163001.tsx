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
import { NavLink } from 'react-router-dom';
import styles from './SignIn.module.css';
import { signInUser, forgotPassword } from '../../api/aws-cognito';
import { Auth } from 'aws-amplify';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const [email, changeEmail] = useState('');
	const [pass, changePass] = useState('');
	const [onClickSignIn, changeOnClickSignIn] = useState(false);
	const [emailForRecovery, setEmailForRecovery] = useState('');
	const [incorrectEmail, setIncorrectEmail] = useState('');
	const [incorrectPass, setIncorrectPass] = useState('');

	useEffect(() => {
		if (onClickSignIn) {
			setIncorrectEmail('');
			setIncorrectPass('');
			let mark = false;
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
				signInUser(email, pass).then(
					success => {
						alert('success login');
					},
					error => alert('error')
				);
			changeOnClickSignIn(false);
		}
	}, [onClickSignIn]);

	useEffect(() => {
		if (emailForRecovery) {
			forgotPassword(emailForRecovery).then(
				success => {
					alert('Your password has been successfully changed!');
				},
				error => {
					alert(`Error. ${error.message}`);
				}
			);
		}
		setEmailForRecovery('');
	}, [emailForRecovery]);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={e => changeEmail(e.target.value)}
						value={email}
						helperText={incorrectEmail}
						error={incorrectEmail !== ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
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
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={e => {
							e.preventDefault();
							changeOnClickSignIn(true);
						}}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link
								href="#"
								variant="body2"
								onClick={() => {
									setEmailForRecovery(prompt('Enter your email ', ''));
								}}
							>
								Forgot password?
							</Link>
							<button
								onClick={() => {
									Auth.currentAuthenticatedUser().then(data => {
										console.log(data);
									});
								}}
							>
								click
							</button>
						</Grid>
						<Grid item>
							<NavLink to="/signup">
								<div className={styles.a}>{"Don't have an account? Sign Up"}</div>
							</NavLink>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
