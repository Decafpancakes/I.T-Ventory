import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ReactDOM, element } from "react-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState, columns, setColumns } from "react";
import MaterialTable from "material-table";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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

export default function Clients(props) {
  const { useState } = React;

  //Initializes the order_table_data variable as a blank array
  const [order_table_data, set_order_table_data] = useState([]);
  const [client_name_input, set_client_name_input] = useState("");

  //Similar to componentDidMount and componentDidUpdate
  // - reactjs.org
  //"async" is used because I prefer it over a thousand .then() methods
  useEffect( () => {
    //On page load or update, fetch and update order_table_data from MongoDB
    //The "documents" variable contains the data that is returned
    let documents = Axios.get("/api/clients_page");
  });

  const [columns, setColumns] = useState([
    {
      title: "Client ",
      field: "item",
      editable: "never",
    },
    {
      title: "City",
      field: "city",
      editable: "always",
    },
    {
      title: "State",
      field: "state",
      editable: "never",
    },
    {
      title: "Address",
      field: "address",
      editable: "always",
    },
    {
      title: "PO",
      field: "po",
      editable: "always",
    }
  ]);

  const classes = useStyles();
  return (
    // These 2 lines are needed to maek sure the information is below the app bar
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <div style={{paddingBottom: "8px" }}>
        <Typography variant="h4" className={classes.title}>Add a Client</Typography>
        </div>

      <form className={classes.input}>
        <TextField label="Client Name" type="clientname" />
        <TextField label="Address" type="address" />
        <TextField label="City" type="city" />
        <TextField label="State" type="state" />
        <TextField label="Phone number" type="phonenumber" />
        <TextField label="PO Number" type="ponumber" />
        <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <Button type="submit" variant="contained" color="submit">
          <SaveIcon />
          Save
        </Button>
        </div>
      </form>

      <div style={{ maxWidth: "100%", paddingTop: "100px" }}>
        <MaterialTable
          //defines the columns, what the title is and its associated value.
          columns={columns}
          data={order_table_data}
          //allows the user to edit the cells
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                console.log("newValue: " + newValue);
                setTimeout(resolve, 1000);
              });
            },
          }}
          title="View Clients"
          icons={{
            Clear: (props) => <DeleteIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // actions={[
          //   {
          //     icon: () => <DeleteIcon />,
          //     tooltip: "Delete Item",
          //     onClick: (event, rowData) =>
          //       alert("You deleted item: " + rowData.item),
          //   },
          // ]}
          // components={{
          //   Action: (props) => (
          //     <Button
          //       onClick={(event) => props.action.onClick(event, props.data)}
          //       variant="text"
          //       style={{ textTransform: "none", color: "#2481ba" }}
          //       size="small"
          //     >
          //       <DeleteIcon />
          //     </Button>
          //   ),
          // }}
          options={{
            headerStyle: {
              backgroundColor: "#2481ba",
              color: "#FFF",
            },
          }}
        />
      </div>
      <div />
    </main>
  );

  ReactDOM.render(element, document.getElementById("root"));
}
