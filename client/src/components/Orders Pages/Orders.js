import React, { useEffect, useState, columns, setColumns } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import PeopleIcon from "@material-ui/icons/People";
import Axios from "axios";
import PublishIcon from "@material-ui/icons/Publish";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2481ba", // This is the "Nortech Blue"
    },
    secondary: {
      main: "#00e676",
    },
  },
});

export default function Order() {
  const [orderTableData, setOrderTableData] = useState([]);
  const [clientNameTextBoxInput, setClientNameTextBoxInput] = useState("");
  const [nameTextBoxInput, setNameTextBoxInput] = useState("");
  const [orderNumberTextBoxInput, setOrderNumberTextBoxInput] = useState("");
  const [
    additionalOrderNotesTextBoxInput,
    setAdditionalOrderNotesTextBoxInput,
  ] = useState("");
  const [rushOrderCheckBox, setRushOrderCheckBox] = useState(false);

  useEffect(() => {
    searchAvailableData();
    //set order number value
    Axios.get("/api/orders_page/getOrderNumber").then((documents) => {
      if (documents.data.length === 0) {
        setOrderNumberTextBoxInput("0");
      } else {
        let orderNumber = Number(documents.data[0].orderNumber) + 1;
        setOrderNumberTextBoxInput(orderNumber);
      }
    });
  }, []);

  function searchAvailableData() {
    Axios.get("/api/orders_page/getAssets").then((documents) => {
      setOrderTableData(documents.data);
    });
  }

  function handleSubmitOrder() {
    if (
      clientNameTextBoxInput === "" ||
      nameTextBoxInput === "" ||
      orderNumberTextBoxInput === ""
    ) {
      alert("You have not entered all of the required information");
    } else {
      //check if they have allocated stock to the client (don't allow nothing to be allocated)
      let somethingAllocated = false;
      let incorrectAllocation = false;
      let allocatedItemsArray = [];
      orderTableData.every((element) => {
        if (element.allocated !== "0") {
          somethingAllocated = true;

          //make sure allocated is not more than stock
          if (element.allocated > element.stock) {
            alert(
              "You have allocated more than is in stock for: " + element.item
            );
            incorrectAllocation = true;
            return false;
          } else if (element.allocated < 0) {
            alert("You cannot set a value less than 0 for: " + element.item);
            incorrectAllocation = true;
            return false;
          }

          //add item to allocatedItemsArray
          allocatedItemsArray.push({
            item: element.item,
            allocated: element.allocated,
          });

          //Make sure to return a value in an every() loop
          return true;
        }
        //Make sure to return a value in an every() loop
        return true;
      });

      if (somethingAllocated === true && incorrectAllocation === false) {
        //Create an order for each item
        allocatedItemsArray.forEach((element) => {
          Axios.post("/api/orders_page/post", {
            item: element.item,
            allocated: element.allocated,
            clientName: clientNameTextBoxInput,
            technician: nameTextBoxInput + "@ntdt.co",
            orderNumber: orderNumberTextBoxInput,
          }).then((response) => {
            console.log(response.status);
          });
        });

        //Subtract allocated from stock of each item
        //Axios.post();
      } else if (somethingAllocated === false) {
        alert("Please do not submit an order without allocating anything.");
      }
    }
  }

  //Determines the columns for the Items table
  const [columns, setColumns] = useState([
    {
      title: "Item",
      field: "item",
      editable: "never",
    },
    {
      title: "Model",
      field: "modelNumber",
      editable: "never",
    },
    {
      title: "Manufacturer",
      field: "manufacturer",
      editable: "never",
    },
    {
      title: "Vendor",
      field: "vendor",
      editable: "never",
    },
    {
      title: "Stock",
      field: "stock",
      editable: "never",
    },
    {
      title: "Allocated",
      field: "allocated",
      editable: "always",
    },
    {
      title: "Sell",
      field: "sellPrice",
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

        <Form>
          {/* Input to attatch a client */}
          <FormGroup className="w-50">
            <Label for="clientName">Client:</Label>
            <Input
              value={clientNameTextBoxInput}
              onChange={(e) => setClientNameTextBoxInput(e.target.value)}
              name="client"
              id="clientName"
              placeholder="Client Name"
            />
          </FormGroup>
          {/* //This is to attatch who is making the order */}
          <FormGroup className="w-50">
            <Label for="orderNumber">Order #:</Label>
            <Input
              value={orderNumberTextBoxInput}
              disabled={true}
              name="order"
              id="orderNumber"
              placeholder="NTDT-O-"
              addonType="prepend"
            />
          </FormGroup>
          {/* This is so you can attatch which employee is making the order */}
          <FormGroup className="w-50">
            <Label for="exampleText">Additional Order Notes:</Label>
            <Input
              value={additionalOrderNotesTextBoxInput}
              onChange={(e) =>
                setAdditionalOrderNotesTextBoxInput(e.target.value)
              }
              name="text"
              id="exampleText"
            />
          </FormGroup>
          <br />
          <FormGroup check>
            <Label check>
              <Input
                value={rushOrderCheckBox}
                onChange={(e) => setRushOrderCheckBox(e.target.value)}
                type="checkbox"
              />{" "}
              Rush Order?
            </Label>
          </FormGroup>
        </Form>

        <div style={{ maxWidth: "100%", paddingTop: "50px" }}>
          {/* //Start of the table component  */}
          <MaterialTable
            //defines the columns, what the title is and its associated value.
            columns={columns}
            data={orderTableData}
            //allows the user to edit the cells
            cellEditable={{
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  //forEach to find what row to edit
                  let indexOfRow;
                  orderTableData.forEach((element) => {
                    if (element.item === rowData.item) {
                      indexOfRow = orderTableData.indexOf(element);
                    }
                  });

                  orderTableData[indexOfRow].allocated = newValue;
                  setTimeout(resolve, 1000);
                });
              },
            }}
            title="Add Items to Order"
            icons={{
              Clear: () => <DeleteIcon />,
              Search: () => <SearchIcon />,
              ResetSearch: () => <DeleteIcon />,
            }}
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
        {/* <Button
          onClick={handleSubmitOrder}
          type="submit"
          variant="contained"
          color="submit"
        >
          <PublishIcon />
          Submit Order
        </Button> */}
        <ThemeProvider theme={theme}>
          <Button
            onClick={handleSubmitOrder}
            type="submit"
            variant="contained"
            color="secondary"
          >
            <PublishIcon />
            Submit Order
          </Button>
        </ThemeProvider>
      </div>
      <div />
    </main>
  );
}
