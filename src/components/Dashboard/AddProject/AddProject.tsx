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
const accessKeyId: string = 'AKIA4OWNERKG3GPEAFON';
const secretAccessKey: string = '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';

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
		group_and_people: {
			display: 'flex',
			width: 'inherit',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			marginBottom: 8,
		},
		addGroup: {},
		addPeople: {},
		addGroup_Autocomplete: {
			marginBottom: 8,
			marginTop: 8,
		},
		addPeople_Position: {
			marginBottom: 8,
			marginTop: 8,
		},
	})
);

export const AddProject = () => {
	interface Employee {
		sub: string;
		name: string;
		email: string;
	}
	type GroupEmployee = {
		groupName: string;
		listEmployee: Employee[];
		permission: string;
	};
	const initEmployee = {
		sub: null,
		name: null,
		email: null,
	};
	const classes = useStyles();
	const [file, updateFile] = useState(null);
	const [projectName, setProjectName] = useState<string>('');
	const [projectDescription, setProjectDescription] = useState<string>('');
	const [imgSrc, setImgSrc] = useState(null);
	const [cognitoGroup, setCognitoGroup] = useState<string>('');
	const [fileKey, setFileKey] = useState<string>('');
	const [usersList, setUsersList] = useState([]);
	const [listSelectedEmployee, changeListSelectedEmployee] = useState<
		Array<Employee>
	>([initEmployee]);
	const [employee, setEmployee] = useState<Employee>(initEmployee);
	const [eventAddGroup, doEventAddGroup] = useState<boolean>(false);
	const [groupAdded, setGroupAdded] = useState<boolean>(false);
	const [eventAddPeople, doEventAddPeople] = useState<boolean>(false);
	const [employeeAdded, setEmployeeAdded] = useState<boolean>(false);
	const [groupName, changeGroupName] = useState<string>('');
	const [selectedPermission, changeSelectedPermission] = useState<string>('');
	const [employeePosition, changeEmployeePosition] = useState<string>('');
	const [listGroup, changeListGroup] = useState<Array<GroupEmployee>>([]);
	const [listEmployee, changeListEmployee] = useState<Array<Employee>>([]);

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
				let params: Params = {
					UserPoolId: 'eu-central-1_incRTtdVN',
					Limit: 60,
				};
				if (paginationToken !== '') {
					params['PaginationToken'] = paginationToken;
				}

				await AWS.config.update({
					region: 'eu-central-1',
					accessKeyId,
					secretAccessKey,
				});

				const cognito = new AWS.CognitoIdentityServiceProvider();

				const rawUsers = await cognito.listUsers(params).promise();

				/* 
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
	const addUserToGroup = async () => {
		function wait(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		AWS.config.update({
			region: 'eu-central-1',
			accessKeyId,
			secretAccessKey,
		});
		const cognito = new AWS.CognitoIdentityServiceProvider();
		
		//allEmployee.push(...listEmployee.map((employee)=> employee.sub));
		for (const group of listGroup) {
			let groupName: string;
			if (group.permission === 'create/update/delete/read') groupName='createUpdateDeleteRead';
			if (group.permission === 'create/update/read') groupName='createUpdateRead';
			if (group.permission === 'delete/read') groupName='deleteRead';
			if (group.permission === 'read') groupName='read';

			for (const employee of group.listEmployee) {
				const addUserParams = {
					GroupName: groupName,
					UserPoolId: 'eu-central-1_incRTtdVN',
					Username: employee.sub,
				};
				
				await cognito/* .adminListGroupsForUser */.adminAddUserToGroup(addUserParams).promise();
				await wait(105);
			}
		}
		debugger
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
				listEmployee: listEmployee,
				listGroupEmployee: listGroup,
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
				changeListSelectedEmployee([initEmployee]);
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

	const listPermissions: string[] = [
		'create/update/delete/read',
		'create/update/read',
		'delete/read',
		'read',
	];
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
				<div className={classes.group_and_people}>
					<Button
						variant="outlined"
						size="medium"
						color="primary"
						className={''}
						onClick={() => {
							setGroupAdded(false);
							if (eventAddPeople) {
								doEventAddGroup(true);
								doEventAddPeople(false);
							} else doEventAddGroup(!eventAddGroup);
						}}
					>
						Add group
					</Button>
					<Button
						variant="outlined"
						size="medium"
						color="primary"
						className={''}
						onClick={() => {
							if (eventAddGroup) {
								doEventAddGroup(false);
								doEventAddPeople(true);
							} else doEventAddPeople(!eventAddPeople);
							setEmployeeAdded(false);
						}}
					>
						Add people
					</Button>
				</div>
				{eventAddGroup && !groupAdded && (
					<div className={classes.addGroup}>
						<TextField
							id="outlined-basic"
							label="Group name"
							variant="outlined"
							value={groupName}
							onChange={e => changeGroupName(e.target.value)}
						/>
						<Autocomplete
							className={classes.addGroup_Autocomplete}
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
									label="Select people"
									placeholder="Next"
								/>
							)}
							/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
							 */ onChange={(event: object, value, reason: string) => {
								const listEmployee = value.map(el => ({
									sub: el.Attributes[0].Value,
									name: el.Attributes[2].Value,
									email: el.Attributes[3].Value,
								}));

								changeListSelectedEmployee(listEmployee);
							}}
						/>
						<Autocomplete
							/* 						  className={classes.addGroup_Autocomplete}*/
							id="tags-standard"
							options={listPermissions}
							getOptionLabel={(option): any => option}
							renderInput={params => (
								<TextField {...params} variant="outlined" label="Select permission" />
							)}
							/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
							 */

							onChange={(event: object, value, reason: string) =>
								changeSelectedPermission(value)
							}
						/>
						<Button
							variant="contained"
							color="primary"
							disableElevation
							onClick={() => {
								const group: GroupEmployee = {
									groupName: groupName,
									listEmployee: listSelectedEmployee,
									permission: selectedPermission,
								};
								changeListGroup([...listGroup, group]);
								setGroupAdded(true);
								doEventAddGroup(false);
								doEventAddPeople(false);
							}}
						>
							ADD
						</Button>
					</div>
				)}
				{groupAdded && <span>Group successful added!</span>}
				{eventAddPeople && !employeeAdded && (
					<div className={classes.addPeople}>
						<Autocomplete
							id="tags-standard"
							options={usersList}
							getOptionLabel={(option): string =>
								`${option.Attributes[2].Value} (${option.Attributes[3].Value})`
							}
							renderInput={params => (
								<TextField
									{...params}
									variant="outlined"
									label="Select people"
									placeholder="Next"
								/>
							)}
							/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
							 */ onChange={(event: object, value, reason: string) => {
								const employee = {
									sub: value.Attributes[0].Value,
									name: value.Attributes[2].Value,
									email: value.Attributes[3].Value,
								};
								setEmployee(employee);
							}}
						/>
						<TextField
							id="outlined-basic"
							label="Position"
							variant="outlined"
							className={classes.addPeople_Position}
							value={employeePosition}
							onChange={e => changeEmployeePosition(e.target.value)}
						/>

						<Autocomplete
							/* 						  className={classes.addGroup_Autocomplete}*/
							id="tags-standard"
							options={listPermissions}
							getOptionLabel={(option): any => option}
							renderInput={params => (
								<TextField {...params} variant="outlined" label="Select permissions" />
							)}
							/* onInputChange={(event: object, value: string, reason: string) => {debugger}}
							 */

							onChange={(event: object, value, reason: string) => {
								debugger;
								changeSelectedPermission(value);
							}}
						/>
						<Button
							variant="contained"
							color="primary"
							disableElevation
							onClick={() => {
								changeListEmployee([...listEmployee, employee]);
								setEmployeeAdded(true);
								doEventAddPeople(false);
								doEventAddGroup(false);
							}}
						>
							ADD
						</Button>
					</div>
				)}
				{employeeAdded && <span>Employee successful added!</span>}
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
					/* CreateProject */
					addUserToGroup
				}
			>
				Create project
			</Button>
		</div>
	);
};
