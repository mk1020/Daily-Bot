import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
	ListSubheader,
	Avatar,
	TextField,
	Tooltip,
	IconButton,
	Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import awsconfig from '../../../aws-exports';
import uuid from 'uuid/v4';
import { createProject, updateProject } from '../../../graphql/mutations';
import { listProjects } from '../../../graphql/queries';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AWS from 'aws-sdk';
const {
	aws_user_files_s3_bucket_region: region,
	aws_user_files_s3_bucket: bucket,
} = awsconfig;
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

export const AddProject = () => {
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

				/* const addUserParams = {
					GroupName: 'admins',
					UserPoolId: 'eu-central-1_incRTtdVN',
					Username: "2a32341c-4fd7-4182-9d72-911b0e5db605",
				  };
				await cognito.adminRemoveUserFromGroup(addUserParams).promise(); */

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

	async function CreateProject() {
		console.log(listSelectedDevelop);
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
				developers: listSelectedDevelop,
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
				changeListSelectedDevelop([initDeveloper]);
				//debugger;
				console.log('successfully stored user data!');
			} catch (err) {
				debugger;
				console.log('error: ', err);
			}
		}
	}

	useEffect(() => {
		getUsers();
	}, []);
	return (
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
						const listDevelopers = value.map(el => ({
							sub: el.Attributes[0].Value,
							name: el.Attributes[2].Value,
							email: el.Attributes[3].Value,
						}));
						if (reason === 'select-option') changeListSelectedDevelop(listDevelopers);
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
				{imgSrc && <img className={classes.mainImg} src={imgSrc} alt="mainIMG" />}
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
			<Button
				variant="outlined"
				color="primary"
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
				Create project
			</Button>
		</div>
	);
};
