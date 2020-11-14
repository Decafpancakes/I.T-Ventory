import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SignIn2 from "./Signin2";

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

export default theme;

//Renders the sign in page
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <SignIn2 />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);