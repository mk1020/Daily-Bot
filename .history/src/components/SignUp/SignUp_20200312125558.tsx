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
import styles from './SignUp.module.css';
import { connect } from 'react-redux';
import { clickSignUp, clickSignIn } from '../../redux/actions/actions';
import { signUpUser } from '../../api/aws-cognito';


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
	useEffect(() => {
		if (onClickSignUp)
		signUpUser(email, firstName, pass).then((success)=> {
			alert( "Уou have successfully registered!");	
		}, (error)=>{alert(`Error. ${error.message}`)})
		changeOnClickSignUp(false)
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
						<Grid item xs={12} >
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
								id="standard-error-helper-text"
								helperText="Incorrect entry."
								autoComplete="current-password"
								onChange={e => changePass(e.target.value)}
								value={pass}
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
						onClick={(e) =>{e.preventDefault(); changeOnClickSignUp(true)}}
					>
						Sign Up
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<NavLink to="/">
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
	clickSignUp,
	clickSignIn,
})(SignUp);
