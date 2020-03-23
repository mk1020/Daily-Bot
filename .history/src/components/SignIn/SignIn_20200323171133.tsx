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
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import styles from './SignIn.module.css';
import { signInUser, forgotPassword } from '../../api/aws-cognito';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import img_loading from '../../img/loading.svg';

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

const SignIn = (props: any) => {
	const classes = useStyles();
	const [email, changeEmail] = useState('');
	const [pass, changePass] = useState('');
	const [onClickSignIn, changeOnClickSignIn] = useState(false);
	const [errEmail, setErrEmail] = useState('');
	const [incorrectPass, setIncorrectPass] = useState('');
	const [changedPass, setChangedPass] = useState('');
	const [errChangePass, setErrChangePass] = useState('');
	const [errSignIn, setErrSignIn] = useState('');

	let history = useHistory();
	let location = useLocation();
	
	useEffect(() => {
		if (onClickSignIn) {
			setErrEmail('');
			setIncorrectPass('');
			let mark = false;
			let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (email == '') {
				setErrEmail('This field cannot be null!');
				mark = true;
			} else if (!regexp.test(email)) {
				setErrEmail('Email entered incorrectly!');
				mark = true;
			}

			if (pass == '') {
				setIncorrectPass('This field cannot be null!');
				mark = true;
			} else if (pass.length < 8) {
				setIncorrectPass('Password must be 8 characters or more!');
				mark = true;
			}
			if (!mark)
				Auth.signIn( email, pass ).then(
					data => {
						history.push('/');
					},
					(err: any) => {
						if (err.message == 'User is not confirmed.') setErrEmail(err.message);
						else setErrSignIn(err.message);
					}
				);
			changeOnClickSignIn(false);
		}
	}, [onClickSignIn]);
	console.log('props.statusChangePass', props.statusChangePass);
	console.log('props.resetPassStart', props.resetPassStart);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={styles.wrapper_signin}>
				{props.statusReg && (
					<span className={styles.success_reg}>
						You were successfully registered! <br/>
						An email has been sent to your email address. Please confirm your registration.
					</span>
				)}
				{props.resetPassStart && !props.statusChangePass ? (
					<img className={styles.img_loading} src={img_loading} alt="img-women" />
				) : null}

				{props.statusChangePass && (
					<span className={styles.success_change_pass}>
						Password was successfully changed!
					</span>
				)}
				{props.errChangePassMessage && (
					<span className={styles.err_change_pass}>
						ERROR. <br /> {props.errChangePassMessage}
					</span>
				)}
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
							helperText={errEmail}
							error={errEmail !== ''}
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
						{errSignIn && (
							<span className={styles.errSignIn}>
								{errSignIn}
								<br />
								You possible made a mistake in your username or password. Try again.
							</span>
						)}
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
									variant="body2"
									onClick={() => {
										history.push('/forgotpassword');
									}}
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<NavLink to="/signup">
									<div className={styles.a}>{"Don't have an account? Sign Up"}</div>
								</NavLink>
								<button  onClick={()=>history.push('/')}>Home</button>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</div>
		</Container>
	);
};

export default connect(
	state => ({
		statusReg: state.signUpReducer.registration,
		statusChangePass: state.signInReducer.changePass,
		errChangePassMessage: state.signInReducer.errChangePass,
		resetPassStart: state.signInReducer.resetPassStart,
	}),
	{}
)(SignIn);
