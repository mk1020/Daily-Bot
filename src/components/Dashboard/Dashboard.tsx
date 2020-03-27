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
import {
	ListSubheader,
	Avatar,
	TextField,
	Tooltip,
	IconButton,
} from '@material-ui/core';
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
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AWS from 'aws-sdk';

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
			width: 150,
			height: 150,
			border: '1px solid #bdbebd',
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
	const initDeveloper = {
		sub: null,
		name: null,
		email: null,
	};
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState(' ');
	const [newProject, setNewProject] = useState(false);
	const [file, updateFile] = useState(null);
	const [projectName, setProjectName] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [imgSrc, setImgSrc] = useState(null);
	const [cognitoGroup, setCognitoGroup] = useState('');
	const [fileKey, setFileKey] = useState('');
	const [usersList, setUsersList] = useState([]);
	const [listSelectedDevelop, changeListSelectedDevelop] = useState<
		Array<Developer>
	>([initDeveloper]);

	const getUsers = async () => {
		try {
			type Params = {
				UserPoolId: string;
				Limit: number;
				paginationToken?: string;
			};
			let allUsers = [];
			let more: boolean = true;
			let paginationToken: string = '';

			while (more) {
				let params = {
					UserPoolId: 'eu-central-1_incRTtdVN',
					Limit: 60,
				};
				if (paginationToken !== '') {
					params['PaginationToken'] = paginationToken;
				}

				let accessKeyId: string = '';
				let secretAccessKey: string = '';
				await Auth.currentCredentials().then(result => {
					accessKeyId = 'AKIA4OWNERKG3GPEAFON';
					secretAccessKey = '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';
				});

				await AWS.config.update({
					region: 'eu-central-1',
					accessKeyId,
					secretAccessKey,
				});

				const cognito = await new AWS.CognitoIdentityServiceProvider();

				const rawUsers = await cognito.listUsers(params).promise();
				allUsers = allUsers.concat(rawUsers.Users);
				if (rawUsers.PaginationToken) {
					paginationToken = rawUsers.PaginationToken;
				} else {
					more = false;
				}
			}
			setUsersList(allUsers);
		} catch (e) {
			console.log(e);
			debugger;
		}
	};
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
		getUsers();
	}, []);

	function onSelectImg(e) {
		updateFile(e.target.files[0]);
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				setImgSrc(reader.result);
			},
			false
		);
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
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
		if (!projectName) return alert('please enter a username'); //TODO: сделать ошибки красивые
		if (file && projectName && projectDescription) {
			const { name: fileName, type: mimeType } = file;
			const key = `${uuid()}${fileName}`;
			setFileKey(key);
			const fileForUpload = {
				bucket,
				key,
				region,
			};
			const inputData = {
				title: projectName,
				description: projectDescription,
				image: fileForUpload,
			};

			try {
				await Storage.put(key, file, {
					contentType: mimeType,
				});

				await API.graphql(graphqlOperation(createProject, { input: inputData }));
				setProjectName('');
				setProjectDescription('');
				updateFile(null);
				setImgSrc(null);
				//debugger;
				console.log('successfully stored user data!');
			} catch (err) {
				debugger;
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
				{newProject && cognitoGroup == 'admins' && (
					<div className={classes.newProject}>
						<div className={classes.wrapperTextField}>
							<h2 className={classes.h2NewProject}>Creating project</h2>
							<TextField
								id="outlined-basic"
								label="Enter title"
								variant="outlined"
								value={projectName}
								onChange={e => setProjectName(e.target.value)}
							/>
							<TextField
								id="outlined-basic"
								label="Enter description"
								variant="outlined"
								className={classes.textField2}
								value={projectDescription}
								onChange={e => setProjectDescription(e.target.value)}
							/>
							<Autocomplete
								multiple
								id="tags-standard"
								options={usersList}
								getOptionLabel={(option): string =>
									`${option.Attributes[2].Value} (${option.Attributes[3].Value})`
								}
								defaultValue={[]}
								renderInput={params => (
									<TextField
										{...params}
										variant="outlined"
										label="Select developers"
										placeholder="Next"
									/>
								)}
								/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
								 */ onChange={(event: object, value, reason: string) => {
									const listDeveloper = value.map(el => ({
										sub: el.Attributes[0].value,
										name: el.Attributes[2].value,
										email: el.Attributes[3].value,
									}));
									if (reason === 'select-option')
										changeListSelectedDevelop(listDeveloper);
								}}
							/>
						</div>
						<div className={classes.squareImg}>
							<input
								id="image-file"
								type="file"
								className={classes.fileInput}
								onChange={onSelectImg}
							/>
							{imgSrc && (
								<img className={classes.mainImg} src={imgSrc} alt="mainIMG" />
							)}
							{!imgSrc && (
								<Tooltip
									title="Add image"
									aria-label="add"
									onClick={() => {
										document.getElementById('image-file').click();
									}}
								>
									<Fab color="primary" className={classes.fab}>
										<AddIcon />
									</Fab>
								</Tooltip>
							)}
						</div>
						<Tooltip title="Delete image" onClick={() => setImgSrc(null)}>
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						<button
							onClick={
								/* () =>
									Storage.remove(fileKey)
										.then(res => {
											debugger;
										})
										.catch(err => {
											debugger;
										}) */
								CreateProject
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
