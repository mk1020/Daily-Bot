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
import { Auth } from 'aws-amplify';
import styles from './ForgotPass.module.css';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ListSubheader, Avatar } from '@material-ui/core';
import TouchAppSharpIcon from '@material-ui/icons/TouchAppSharp';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ReorderRoundedIcon from '@material-ui/icons/ReorderRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { deepOrange } from '@material-ui/core/colors';
import { resolve } from 'url';
import { Resolver } from 'dns';
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
	})
);

const Dashboard = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState('');
	const history = useHistory();
	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		Auth.currentUserInfo().then(res => {
			setName(res.attributes.name);
		});
	}, []);

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
				<Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
					enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
					imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
					Convallis convallis tellus id interdum velit laoreet id donec ultrices.
					Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
					adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
					nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
					leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
					feugiat vivamus at augue. At augue eget arcu dictum varius duis at
					consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
					sapien faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
					eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
					neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
					tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
					sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
					tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
					gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
					et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
					tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
					eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
					posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography>
			</main>
		</div>
	);
};
export default connect(state => ({}), {})(Dashboard);
