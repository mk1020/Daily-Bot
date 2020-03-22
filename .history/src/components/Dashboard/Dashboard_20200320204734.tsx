import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify';
import styles from './ForgotPass.module.css';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

const Dashboard = ()=> {
	return ( <AppBar>
		<Toolbar>
		  <Typography variant="h6">Scroll to Elevate App Bar</Typography>
		</Toolbar>
	  </AppBar>)
}

export default connect(
	state => ({
	}),
	{  }
)(Dashboard);
