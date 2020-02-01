import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from '@material-ui/core/Toolbar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		background: 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		background: 'linear-gradient(to bottom, rgb(142, 45, 226), rgb(74, 0, 224))'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

function NavBar({ children, location }) {
	const classes = useStyles();
	const theme = useTheme();
	const [ mobileOpen, setMobileOpen ] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div
				className={classes.toolbar}
				style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Typography variant="h4" noWrap style={{ color: 'white' }}>
					lifeMaxx
				</Typography>
			</div>
			<Divider />
			<MenuList>
				<MenuItem style={{ color: 'white' }} component={Link} to="/" selected={'/' === location.pathname}>
					<ListItemIcon style={{ color: 'white' }}>
						<HomeIcon />
					</ListItemIcon>
					Home
				</MenuItem>
				<MenuItem
					style={{ color: 'white' }}
					component={Link}
					to="/form"
					selected={'/form' === location.pathname}
				>
					<ListItemIcon style={{ color: 'white' }}>
						<PeopleIcon />
					</ListItemIcon>
					People Details
				</MenuItem>
				<MenuItem style={{ color: 'white' }} component={Link} to="/map" selected={'/map' === location.pathname}>
					<ListItemIcon style={{ color: 'white' }}>
						<MapIcon />
					</ListItemIcon>
					Heat Map
				</MenuItem>
				<MenuItem
					style={{ color: 'white' }}
					component={Link}
					to="/help_others"
					selected={'/help_others' === location.pathname}
				>
					<ListItemIcon style={{ color: 'white' }}>
						<AccessibilityIcon />
					</ListItemIcon>
					Help Others
				</MenuItem>
				<MenuItem
					style={{ color: 'white' }}
					component={Link}
					to="/dashboard"
					selected={'/dashboard' === location.pathname}
				>
					<ListItemIcon style={{ color: 'white' }}>
						<DashboardIcon />
					</ListItemIcon>
					Dashboard
				</MenuItem>
			</MenuList>
			{/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
}
export default withRouter(NavBar);
