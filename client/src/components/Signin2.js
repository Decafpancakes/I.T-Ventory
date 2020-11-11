import React, { useState  }from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        I.T Ventory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn2({handleLogin, handleLogout}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  function handleSuccessfulAuth(data){
    handleLogin(data);
  }

  function handleLogoutClick(){
    axios
    .delete("http://localhost:3001/logout", { withCredentials: true}) 
    .then(response => {
        handleLogout();
    }) 
    .catch(error => {
        console.log("logout error", error); 
    });
}

  return (
    <Container component="main" maxWidth="xs" Position="center">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          alt="Remy Sharp"
          src="http://www.ntdt.co/rw_common/images/flatlogo.png"
          className={classes.large}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button 
            onClick={handleLogoutClick}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Registration handleSuccessfulAuth={(data)=> handleSuccessfulAuth(data)} />
          <Login handleSuccessfulAuth={(data)=> handleSuccessfulAuth(data)} />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" href="https://bit.ly/3ky7jgn">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
