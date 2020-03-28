import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
	Avatar,

} from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { deepOrange } from '@material-ui/core/colors';
import { listProjects } from '../../graphql/queries';

import { AddProject } from './AddProject/AddProject';

const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		list: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		nested: {
			paddingLeft: theme.spacing(4),
			paddingTop: theme.spacing(0),
			paddingBottom: theme.spacing(0),
		},
		toolBar: {
			justifyContent: 'space-between',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(1),
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		orange: {
			color: theme.palette.getContrastText(deepOrange[500]),
			backgroundColor: deepOrange[500],
		},
		newProject: {},
		wrapperTextField: {
			display: 'flex',
			flexDirection: 'column',
			maxWidth: '300px',
		},
		textField2: {
			marginTop: 8,
			marginBottom: 8,
		},
		fab: {
			margin: theme.spacing(2),
		},
		squareImg: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			width: 150,
			height: 150,
			border: '1px dashed #bdbebd',
			marginTop: 8,
		},
		h2NewProject: {
			textAlign: 'center',
			fontFamily: 'Caveat, cursive',
			fontWeight: 700,
			fontSize: 24,
		},
		fileInput: {
			position: 'absolute',
			left: '-99999rem',
			/* display: "none" */
		},
		mainImg: {
			width: '100%',
			height: '100%',
		},
	})
);

const Dashboard = () => {
	interface Developer {
		sub: string;
		name: string;
		email: string;
	}
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState(' ');
	const [newProject, setNewProject] = useState(false);
	const [cognitoGroup, setCognitoGroup] = useState('');
	const [titleAllProjects, setTitleAllProjects] = useState<Array<string>>(['']);

	const history = useHistory();

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		Auth.currentUserInfo().then(res => {
			setName(res.attributes.name);
		});
		Auth.currentSession().then(res => {
			setCognitoGroup(res.getIdToken().payload['cognito:groups'][0]);
		});
		listProject();
	}, []);

	const listProject = async () => {
		type Project = {
			id: string;
			title: string;
			description: string;
			image: {
				bucket: string;
				region: string;
				key: string;
			};
			developers: Developer[];
		};
		type GetProjectsQuery = {
			data: {
				listProjects: {
					items: Project[];
				};
			};
		};

		const allProjects = (await API.graphql(
			graphqlOperation(listProjects)
		)) as GetProjectsQuery;
		if (allProjects.data)
			setTitleAllProjects(allProjects.data.listProjects.items.map(el => el.title));
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolBar}>
					<Typography variant="h6" noWrap>
						Daily Dashboard
					</Typography>
					<Avatar className={classes.orange}>{Name[0].toUpperCase()}</Avatar>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.toolbar} />
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					className={classes.list}
				>
					<ListItem button onClick={handleClick}>
						<ListItemIcon>
							<ReorderRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="List projects" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{titleAllProjects.map(el => (
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<PlayArrowRoundedIcon />
									</ListItemIcon>
									<ListItemText primary={el} />
								</ListItem>
							))}
						</List>
					</Collapse>
					{cognitoGroup == 'admins' && (
						<>
							<Divider />
							<ListItem button onClick={() => setNewProject(true)}>
								<ListItemIcon>
									<ExitToAppRoundedIcon />
								</ListItemIcon>
								<ListItemText primary="Add new project" />
							</ListItem>
						</>
					)}
					<Divider />
					<ListItem
						button
						onClick={async () => {
							await Auth.signOut();
							history.push('/signin');
						}}
					>
						<ListItemIcon>
							<ExitToAppRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Out" />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{newProject && cognitoGroup == 'admins' && <AddProject />}
			</main>
		</div>
	);
};
export default connect(state => ({}), {})(Dashboard);
