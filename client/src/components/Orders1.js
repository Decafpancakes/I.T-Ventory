import React, { useEffect, useState } from "react";
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

export default function Order(props) {
  /* const [dataStore, setDataStore] = useState([
    { item: "Keyboard", amount: 3, cost: 20, total: 60 },
    { item: "Display", amount: 2, cost: 45, total: 90 },
    { item: "iPad", amount: 5, cost: 100, total: 500 },
    { item: "Macbook", amount: 4, cost: 200, total: 800 },
    { item: "Surface", amount: 5, cost: 20, total: 875 },
  ]); */

  //Initializes the order_table_data variable as a blank array
  const [order_table_data, set_order_table_data] = useState([]);
  const [client_name_input, set_client_name_input] = useState("");

  //Similar to componentDidMount and componentDidUpdate
  // - reactjs.org
  //"async" is used because I prefer it over a thousand .then() methods
  useEffect(async () => {
    //On page load or update, fetch and update order_table_data from MongoDB
    //The "documents" variable contains the data that is returned
    let documents = Axios.get("/api/clients_page");
  });

  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <InputGroup className="w-50">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <PeopleIcon />
            </InputGroupText>
          </InputGroupAddon>
          <Input value={client_name_input} placeholder="Client Name" />
        </InputGroup>
        <br />

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                icon={<AlarmIcon fontSize="small" />}
                checkedIcon={<AlarmIcon fontSize="small" />}
                style={{
                  color: "#2481ba",
                }}
                name="checkedI"
              />
            }
            label="Urgent?"
          />
        </FormGroup>

        <br />
        <InputGroup className="w-25">
          <Input placeholder="name" />
          <InputGroupAddon addonType="append">
            <InputGroupText>@ntdt.co</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br />

        <MaterialTable
          columns={[
            {
              title: "Item",
              field: "item",
            },
            {
              title: "Amount",
              field: "amount",
              type: "numeric",
            },
            {
              title: "Cost",
              field: "cost",
              type: "numeric",
            },
            {
              title: "Total",
              field: "total",
              type: "numeric",
            },
          ]}
          data={order_table_data}
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
