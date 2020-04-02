import React, { useState, useEffect } from 'react';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Project.module.css';
import { listProjects } from 'src/graphql/queries';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	ListItemSecondaryAction,
	IconButton,
	createStyles,
	Theme,
	makeStyles,
} from '@material-ui/core';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
type Props = {
	title: string;
};
type Project = {
	id: string;
	title: string;
	description: string;
	image: {
		bucket: string;
		region: string;
		key: string;
	};
	listEmployeeWithoutGroup: any;
	listGroupEmployee: any;
};
type GetProjectsQuery = {
	data: {
		listProjects: {
			items: Project[];
		};
	};
};
interface Employee {
	sub: string;
	name: string;
	email: string;
}
type GroupEmployee = {
	groupName: string;
	listEmployee: Employee[];
	permissions: string;
};
const initEmployee = {
	sub: 'undefined',
	name: 'undefined',
	email: 'undefined',
};
const initGroupEmployee = {
	groupName: 'undefined',
	listEmployee: [initEmployee],
	permissions: 'undefined',
};
export default function Project(props: Props) {
	const [mainImgUrl, updateMainImgUrl] = useState<string>('');
	const [description, undateDescription] = useState<string>('');
	const [openListGroups, setOpenListGroups] = useState<boolean>(false);
	const [openGroup, setOpenGroup] = useState<boolean>(false);
	const [groupsEmployee, updateGroupsEmployee] = useState<Array<GroupEmployee>>(
		[]
	);
	const handleClickListGroups = () => {
		setOpenListGroups(!openListGroups);
	};
	const handleClickGroup = () => {
		setOpenGroup(!openGroup);
	};
	async function fetchProject(title: string) {
		try {
			const project = (await API.graphql(
				graphqlOperation(listProjects, {
					filter: { title: { contains: title } },
				})
			)) as GetProjectsQuery;

			const imageData = await Storage.get(
				project.data.listProjects.items[0].image.key
			);
			updateMainImgUrl(typeof imageData === 'string' ? imageData : 'error');
			undateDescription(project.data.listProjects.items[0].description);
			updateGroupsEmployee(project.data.listProjects.items[0].listGroupEmployee);
			debugger;
		} catch (err) {
			console.log('error: ', err);
		}
	}
	{
		/* <ListItem button className={''}>
										<ListItemIcon>
											{open ? <ExpandMore /> : <NavigateNextOutlinedIcon />}
										</ListItemIcon>
										<ListItemText primary={el.groupName} />
									</ListItem> */
	}
	useEffect(() => {
		fetchProject(props.title);
	}, [props.title]);

	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			ListItemGroups: {
				paddingLeft: theme.spacing(6),
			},
			ListItemEmployee: {
				paddingLeft: theme.spacing(10),
			},
			IconButtonAdd: {
				/* position: "absolute",
				left: 100 */
			},
		})
	);
	const classes = useStyles();
	//TODO: у групп: отредактировать, дабаить участника, удалить группу
	//TODO: где лист групп: добавить группу
	return (
		<Card className={styles.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={mainImgUrl}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
					<List>
						<ListItem button onClick={handleClickListGroups}>
							<ListItemIcon>
								<FormatListBulletedOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary="List groups" />
							<ListItemSecondaryAction className={classes.IconButtonAdd}>
								<IconButton edge="end">
									<AddBoxIcon />
								</IconButton>
							</ListItemSecondaryAction>
							<ListItemIcon>
								{openListGroups ? <ExpandLess /> : <ExpandMore />}
							</ListItemIcon>
						</ListItem>
						<Collapse in={openListGroups} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{groupsEmployee &&
									groupsEmployee.map(el => (
										<List>
											<ListItem
												button
												onClick={handleClickGroup}
												className={classes.ListItemGroups}
											>
												<ListItemIcon>
													{openGroup ? <ExpandMore /> : <NavigateNextOutlinedIcon />}
												</ListItemIcon>
												<ListItemText primary={el.groupName} />
												<ListItemSecondaryAction>
													<IconButton edge="end" >
														<PersonAddIcon />
													</IconButton>
													<IconButton edge="end">
														<EditIcon />
													</IconButton>
													<IconButton edge="end" aria-label="delete">
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
											<Collapse in={openGroup} timeout="auto" unmountOnExit>
												<List component="div" disablePadding>
													<ListItem
														button
														onClick={handleClickGroup}
														className={classes.ListItemGroups}
													>
														<ListItemIcon>
															<WarningIcon />
														</ListItemIcon>
														<ListItemText primary={`Permissions: ${el.permissions}`} />
													</ListItem>
													{el.listEmployee.map(employee => (
														<ListItem button className={classes.ListItemEmployee}>
															<ListItemIcon>
																<PersonOutlineOutlinedIcon />
															</ListItemIcon>
															<ListItemText primary={`${employee.name}(${employee.email})`} />
															<ListItemSecondaryAction>
																<IconButton edge="end" aria-label="delete">
																	<DeleteIcon fontSize='small'/>
																</IconButton>
															</ListItemSecondaryAction>
														</ListItem>
													))}
												</List>
											</Collapse>
										</List>
									))}
							</List>
						</Collapse>
					</List>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				<Button size="small" color="primary">
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}
