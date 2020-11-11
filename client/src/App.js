//import React from 'react';
import React, { Component, useEffect, useState} from "react";
import axios from 'axios';
import {
  BrowserRouter,
  Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ComputerIcon from "@material-ui/icons/Computer";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Order from "./components/Orders Pages/Orders";
import ViewOrders from "./components/Orders Pages/ViewOrders";
import Home from "./components/Home Pages/Home";
import Clients from "./components/Clients Pages/Clients";
import Users from "./components/Users Pages/Users";
import SignIn2 from "./components/Signin2";
import Assets from "./components/Assets Pages/Assets";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";

//Test Code for default page


function Display(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <AppBar />;
  }
  return <SignIn2 />;
}




//Defining 
const App = (props) => { 

  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    // necessary for content to be below app bar
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100vh",
      overflow: "auto",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: 320,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    logout: {
      marginLeft: 'auto',
    },
    logoCenter: {
      position: 'absolute', 
      left: '50%', 
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }));
  //End Styling

  function checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          /* this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          }) */
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user);
        } else if (!response.data.logged_in & loggedInStatus === "LOGGED_IN") {
          /* this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          }) */
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({});
        }
      })
    
      .catch(error => {
        console.log("check login error", error);
      });
  }

  useEffect(()=>{
    checkLoginStatus();
  }, []);

  function handleLogout() { 
    setLoggedInStatus("NOT_LOGGED_IN");
    setUser({});
  }

  function handleLogin(data) {
    /* this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    }); */
    setLoggedInStatus("LOGGED_IN");
    setUser(data);
  }


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
    // <Display className="App" isLoggedIn={false}>
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

                <div className={classes.logoCenter}>
                <img style={{width: 60, height: 'auto', verticalAlign: 'middle'}} src="http://www.ntdt.co/rw_common/images/flatlogo.png" alt="Nortech"/>
                </div>

                <div className={classes.logout} >
                  <Button type="submit" variant="contained" color="secondary">
                    Logout
                  </Button>
                </div>

              </Toolbar>
          
        </AppBar>


      <BrowserRouter>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>

          <Divider />

          <Link to="/Home" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/Create Order" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create an Order" />
            </ListItem>
          </Link>

          <Link to="/View Orders" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="View Orders" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/Clients" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/Assets" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Assets" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/Register" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add a User" />
            </ListItem>
          </Link>
        </Drawer>

        <Switch>
          <Route exact path={"/"} component={SignIn2} />
          <Route path={"/Home"} component={Home} />
          <Route path={"/Create Order"} component={Order} />
          <Route path={"/View Orders"} component={ViewOrders} />
          <Route path={"/Clients"} component={Clients} />
          <Route path={"/Users"} component={Users} />
          <Route path={"/Assets"} component={Assets} />
          <Route path={"/Login"} component={Login} />
          <Route path={"/Register"} component={Registration} />
        </Switch>
      </BrowserRouter>
    </div>
    // </Display>
  );
};

export default App;
