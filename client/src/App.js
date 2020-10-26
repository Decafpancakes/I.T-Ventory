//import React from 'react';
import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./components/Orders1";
import Home from "./components/Home/Home";
import Clients from "./components/Clients";
import SignIn from "./components/SignIn";
import Assets from "./components/Assets"; 
import Integrations from "./components/Integrations"; 
import Login from "./components/Login";

//Test Code for default page
//import React, { Component } from 'react'; 


//Defining 
const App = () => { 
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    // necessary for content to be below app bar
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  //End Styling

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //All Styling
  

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{backgroundColor:"#2481ba"}} className={clsx(classes.appBar, {
        [classes.appBarShift]: open, })}>

        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open, })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            I.T Ventory
          </Typography>

        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Drawer variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]:
          !open, })} classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        
        <Divider />
        <Link to="/Home" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        </Link>

        <Link to="/Orders" className={classes.link}>
        <ListItem button >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        </Link>

      <Link to="/Clients" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      </Link>

      <Link to="/Assets" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Assets" />
      </ListItem>
      </Link>

      <Link to="Integrations" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
      </Link>

      </Drawer>


      <Switch>
          <Route exact path = {"/"} component = {SignIn}/>  
          <Route path ={"/Home"} component = {Home}/>
          <Route path ={"/Orders"} component = {NewOrder}/>
          <Route path ={"/Clients"} component = {Clients}/>
          <Route path={"/Assets"} component = {Assets}/>
          <Route path={"/Integrations"} component = {Integrations}/>
          <Route path={"/Login"} component = {Login}/>
        </Switch>

      </BrowserRouter>
        
    </div>
    
  );
}

export default App; 
