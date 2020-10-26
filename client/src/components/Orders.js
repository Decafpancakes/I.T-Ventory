import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";


function createData(id, item, ammount, costperitem, total) {
  return { id, item, ammount, costperitem, total };
}

const rows = [
  createData(0, "Keyboard", "3", "20", "60"),
  createData(1, "Display", "2", "45", "90"),
  createData(2, "iPad", "5", "100", "500"),
  createData(3, "Macbook", "4", "200", "800"),
  createData(4, "Surface", "5", "175", "875"),
];

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
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
}));

const Order = (props) => {
  const classes = useStyles();
  return (
    // These 2 lines are needed to maek sure the information is below the app bar
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Typography variant="h4" gutterBottom component="h2">
        New Order
      </Typography>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <PeopleIcon />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Client Name" />
      </InputGroup>

      <br />
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input
              addon
              type="checkbox"
              aria-label="Checkbox for following text input"
            />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Urgent?" />
      </InputGroup>
      <br />

      <InputGroup>
        <Input placeholder="name" />
        <InputGroupAddon addonType="append">
          <InputGroupText>@ntdt.co</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <br />

      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input placeholder="Amount" min={0} max={100} type="number" step="1" />
        <InputGroupAddon addonType="append">.00</InputGroupAddon>
      </InputGroup>

      <div />
    </main>
  );
};

export default Order;