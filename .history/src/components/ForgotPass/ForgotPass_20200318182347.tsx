import React, { useState, useEffect, useContext } from 'react';
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
import { Auth } from 'aws-amplify';
import styles from './ForgotPass.module.css';

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
	const [onClickEnter, changeOnClickEnter] = useState(false);
	const [errEmail, setErrEmail] = useState('');
	const [letterSent, setLetterSent] = useState(false);

	useEffect(() => {
		if (onClickEnter) {
			setErrEmail('');
			let mark = false;
			let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (email == '') {
				setErrEmail('This field cannot be null!');
				mark = true;
			} else if (!regexp.test(email)) {
				setErrEmail('Email entered incorrectly!');
				mark = true;
			}

			/* if (pass == '') {
				setIncorrectPass('This field cannot be null!');
				mark = true;
			} else if (pass.length < 8) {
				setIncorrectPass('Password must be 8 characters or more!');
				mark = true;
			} */
			if (!mark)
				Auth.forgotPassword(email).then(
					async success => {
						setLetterSent(true);
					},
					err => {
						setErrEmail(err.message);
					}
				);

			if (!mark && letterSent === true)
				await Auth.forgotPasswordSubmit(emailForRecovery, code, newPassword).then(
					() => {
						debugger;
						setChangedPass(newPassword);
					},
					err => {
						setErrChangePass(err.message);
						debugger;
					}
				);

			changeOnClickEnter(false);
		}
	}, [onClickEnter]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={styles.wrapper_forgot_pass}>
				{letterSent && (
					<span className={styles.letterSent}>
						A letter with a code was sent to the specified address
					</span>
				)}
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Reset your password
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Type your email address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={e => changeEmail(e.target.value)}
							helperText={errEmail}
							error={errEmail !== ''}
						/>

						{letterSent && (
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Normal"
								id="outlined-margin-normal"
								autoComplete="current-password"
								helperText="Some important text"
								className={classes.textField}
							/>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={e => {
								e.preventDefault();
								changeOnClickEnter(true);
							}}
						>
							Enter
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</div>
		</Container>
	);
}
