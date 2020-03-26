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
import styles from './ForgotPass.module.css';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ListSubheader, Avatar, TextField, Tooltip } from '@material-ui/core';
import TouchAppSharpIcon from '@material-ui/icons/TouchAppSharp';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { deepOrange } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import awsconfig from '../../aws-exports';
import uuid from 'uuid/v4';
import { createProject, updateProject } from '../../graphql/mutations';
import { listProjects } from '../../graphql/queries';
const {
	aws_user_files_s3_bucket_region: region,
	aws_user_files_s3_bucket: bucket,
} = awsconfig;

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
			width: 300,
			height: 300,
			border: '1px solid #bdbebd',
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
		},
	})
);

const Dashboard = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState(' ');
	const [newProject, setNewProject] = useState(false);
	const [file, updateFile] = useState(null);
	const [projectName, updateProjectName] = useState('meeeekee');
	const [imgUrl, updateImgUrl] = useState('');
	const history = useHistory();

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		Auth.currentUserInfo().then(res => {
			setName(res.attributes.name);
		});
	}, []);

	function onSelectImg(e) {
		updateFile(e.target.files[0]);
	}
	async function fetchImage(key) {
		try {
			const imageData = await Storage.get(key);
			//updateImgUrl(imageData);
		} catch (err) {
			console.log('error: ', err);
		}
	}
	async function CreateProject() {
		if (!projectName) return alert('please enter a username');
		if (file && projectName) {
			const { name: fileName, type: mimeType } = file;
			const key = `${uuid()}${fileName}`;
			const fileForUpload = {
				bucket,
				key,
				region,
			};
			const inputData = { title: projectName, image: fileForUpload };

			try {
				await Storage.put(key, file, {
					contentType: mimeType,
					level: 'protected' 
				});
				await API.graphql(graphqlOperation(createProject, { input: inputData }));
				updateProjectName('');
				debugger;
				console.log('successfully stored user data!');
			} catch (err) {
				console.log('error: ', err);
			}
		}
	}
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
							<ListItem button className={classes.nested}>
								<ListItemIcon>
									<PlayArrowRoundedIcon />
								</ListItemIcon>
								<ListItemText primary="Starred" />
							</ListItem>
							<ListItem button className={classes.nested}>
								<ListItemIcon>
									<PlayArrowRoundedIcon />
								</ListItemIcon>
								<ListItemText primary=" pr №2" />
							</ListItem>
						</List>
					</Collapse>
					<Divider />
					<ListItem button onClick={() => setNewProject(true)}>
						<ListItemIcon>
							<ExitToAppRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Add new project" />
					</ListItem>
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
				{newProject && (
					<div className={classes.newProject}>
						<div className={classes.wrapperTextField}>
							<h2 className={classes.h2NewProject}>Creating project</h2>
							<TextField id="outlined-basic" label="Enter title" variant="outlined" />
							<TextField
								id="outlined-basic"
								label="Enter description"
								variant="outlined"
								className={classes.textField2}
							/>
						</div>
						<div className={classes.squareImg}>
							<input
								id="image-file"
								type="file"
								className={classes.fileInput}
								onChange={onSelectImg}
							/>
							<Tooltip
								title="Add"
								aria-label="add"
								onClick={() => {
									document.getElementById('image-file').click();
								}}
							>
								<Fab color="primary" className={classes.fab}>
									<AddIcon />
								</Fab>
							</Tooltip>
						</div>
						<button
							onClick={
								() =>
									Storage.remove(
										'protected/eu-central-1:f5fe819a-41bb-4983-a768-248b219d9f4f/e0737d01-2a89-4e7f-b52d-1465fc0b2f04123.png',
										{ level: 'protected' }
									).then(res=> {debugger}).catch(err=>{debugger} )
								//CreateProject
							}
						>
							create project
						</button>
					</div>
				)}
			</main>
		</div>
	);
};
export default connect(state => ({}), {})(Dashboard);
