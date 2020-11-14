import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import App from "./App";
import bcrypt from "bcryptjs";

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

export default function SignIn2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2481ba", // This is the "Nortech Blue"
      },
      secondary: {
        main: "#F21D1D",
      },
      success: {
        main: "#00e676",
      },
    },
  });

  //Send the entered username and password to the backend
  async function handleLogin() {
    let response = await axios.post("/api/login_page/login", {
      username: username,
    });

    //Decrypt the password and compare it with the entered one
    bcrypt.compare(password, response.data.password, (err, result) => {
      if (result === true) {
        //Gives a cookie
        localStorage.setItem("loggedIn", true);
        //Reroute to dashboard
        ReactDOM.render(
          <ThemeProvider theme={theme}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ThemeProvider>,
          document.getElementById("root")
        );
      } else {
        //Invalid Login
        alert("These credentials are incorrect");
      }
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
            autoFocus
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleLogin}
            id="signInButton"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
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
