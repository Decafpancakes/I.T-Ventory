import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
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
  input: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Users() {
  const [clientsTableData, setClientsTableData] = useState([]);
  const [clientNameTextField, setClientNameTextField] = useState("");
  const [addressTextField, setAddressTextField] = useState("");
  const [cityTextField, setCityTextField] = useState("");
  const [stateTextField, setStateTextField] = useState("");
  const [phoneNumberTextField, setPhoneNumberTextField] = useState("");
  const [emailTextField, setEmailTextField] = useState("");


  useEffect(() => {
    getClientData();
  }, []);

  function getClientData() {
    Axios.get("/api/clients_page/clientInfo").then((documents) => {
      setClientsTableData(documents.data);
    });
  }

  function handleSaveButton() {
    Axios.post("/api/clients_page/postInfo", {
      client: clientNameTextField,
      phoneNumber: phoneNumberTextField,
      city: cityTextField,
      state: stateTextField,
      address: addressTextField,
      email: emailTextField,
    }).then((response) => {
      console.log(response.status);
      getClientData();
    });
  }

  const classes = useStyles();
  return (
    // These 2 lines are needed to maek sure the information is below the app bar
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <div style={{ paddingBottom: "8px" }}>
        <Typography variant="h4" className={classes.title}>
          Add a User
        </Typography>
      </div>

      <form className={classes.input}>
  
        <TextField
          label="Username"
          value={addressTextField}
          onChange={(e) => setAddressTextField(e.target.value)}
        />
        <TextField
          label="Password"
          value={stateTextField}
          onChange={(e) => setStateTextField(e.target.value)}
          type="password"
        />
        
        <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
          <Button
            onClick={handleSaveButton}
            type="submit"
            variant="contained"
            color="submit"
          >
            <SaveIcon />
            Save
          </Button>
        </div>
      </form>
      <div />
    </main>
  );
}

