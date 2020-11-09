import React, { useEffect, useState, columns, setColumns } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import PeopleIcon from "@material-ui/icons/People";
import Axios from "axios";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
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

export default function Order(props) {
  const { useState } = React;

  //Initializes the order_table_data variable as a blank array
  const [order_table_data, set_order_table_data] = useState([]);
  const [client_name_input, set_client_name_input] = useState("");

  //Similar to componentDidMount and componentDidUpdate
  // - reactjs.org
  //"async" is used because I prefer it over a thousand .then() methods
  useEffect(() => {
    //On page load or update, fetch and update order_table_data from MongoDB
    //The "documents" variable contains the data that is returned
    let documents = Axios.get("/api/clients_page");
  });

  const [columns, setColumns] = useState([
    {
      title: "Item",
      field: "item",
      editable: "never",
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      initialEditValue: "0",
      editable: "onAdd",
    },
    {
      title: "Cost",
      field: "cost",
      type: "numeric",
      editable: "never",
    },
    {
      title: "Total",
      field: "total",
      type: "numeric",
      editable: "never",
    },
  ]);

  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <div style={{ paddingBottom: "15px" }}>
          <Typography variant="h4" className={classes.title}>
            Create a New Order
          </Typography>
        </div>

        {/* Input to attatch a client */}
        <InputGroup className="w-50">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <PeopleIcon />
            </InputGroupText>
          </InputGroupAddon>
          <Input value={client_name_input} placeholder="Client Name" />
          <Button variant="contained" color="primary" disableElevation>
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
        <InputGroup className="w-25">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>NTDT-O-</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Order Number"/>
        </InputGroup>
        <br />
        

        <div style={{ maxWidth: "100%", paddingTop: "50px" }}>
          {/* //Start of the table component  */}
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
            title="Add Items to Order"
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
                rowStyle: {
                  borderBottom: "5px solid white",
                },
              },
            }}
          />
        </div>
        <div
          style={{
            maxWidth: "100%",
            paddingTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <Button type="submit" variant="contained" color="submit">
          <PublishIcon />
          Submit Order
        </Button>
      </div>
      <div />
    </main>
  );
}
