import React, { useEffect, useState, columns, setColumns } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
//import SaveIcon from "@material-ui/icons/Save";
import { Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import Typography from '@material-ui/core/Typography';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import PeopleIcon from "@material-ui/icons/People";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
//import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AlarmIcon from "@material-ui/icons/Alarm";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    height: "100vh",
    overflow: "auto",
    color: "inherit",
  },
  toolbar: {
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function Order(props){
   const { useState } = React;
   
  //Initializes the order_table_data variable as a blank array
  const [order_table_data, set_order_table_data] = useState([]);
  const [client_name_input, set_client_name_input] = useState("");

  //Similar to componentDidMount and componentDidUpdate
  // - reactjs.org
  //"async" is used because I prefer it over a thousand .then() methods
  /* useEffect(async () => {
    //On page load or update, fetch and update order_table_data from MongoDB
    //The "documents" variable contains the data that is returned
    let documents = await Axios.get("/api/orders_page");
    set_order_table_data(documents.data);
  }, []); */

  

  const [columns, setColumns] = useState([
      {
        title: 'Item',
        field: 'item',
      },
      {
        title: 'Amount',
        field: 'amount',
        type: 'numeric',
        initialEditValue: '0'
      },
      {
        title: 'Cost',
        field: 'cost',
        type: 'numeric',
      },
      {
        title: 'Total',
        field: 'total',
        type: 'numeric',
      },
    ]);

    const [data, setData] = useState([
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);


  const classes = useStyles();


  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>

        {/* Input to attatch a client */}
        <InputGroup className="w-50">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <PeopleIcon />
            </InputGroupText>
          </InputGroupAddon>
          <Input value={client_name_input} placeholder="Client Name" />
          <Button variant="contained" color="#2481ba" disableElevation >
              Search
         </Button>
        </InputGroup>


        {/* //This is to attatch who is making the order */}
        <br />
        <InputGroup className="w-25">
          <Input placeholder="name" />
          <InputGroupAddon addonType="append">
            <InputGroupText>@ntdt.co</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br />






        {/* //Start of the table component  */}
        <MaterialTable
          
          //defines the columns, what the title is and its associated value.
          columns={columns}
          data={order_table_data}
          cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                console.log('newValue: ' + newValue);
                setTimeout(resolve, 1000);
              });
            }
          }}
          title="Order"
          icons={{
            Clear: (props) => <DeleteIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: () => <DeleteIcon />,
              tooltip: "Delete Item",
              onClick: (event, rowData) =>
                alert("You deleted item: " + rowData.item),
            },
          ]}
          components={{
            Action: (props) => (
              <Button
                onClick={(event) => props.action.onClick(event, props.data)}
                variant="text"
                style={{ textTransform: "none", color: "#2481ba" }}
                size="small"
              >
                <DeleteIcon />
              </Button>
            ),
          }}
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
}
