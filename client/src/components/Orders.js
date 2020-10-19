import React, {useState} from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {ReactDOM, element} from 'react-dom';
import PeopleIcon from "@material-ui/icons/People";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { MDBCol, MDBInput,MDBFormInline, MDBIcon } from "mdbreact";
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// const useStyles = makeStyles((theme) => ({
    
//     // necessary for content to be below app bar
//     appBarSpacer: theme.mixins.toolbar,
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing.unit * 3,
//       height: "100vh",
//       overflow: "auto"
//     },
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//       padding: theme.spacing(0, 1),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//     chartContainer: {
//       marginLeft: -22
//     },
//     tableContainer: {
//       height: 320
//     },
//   }));
  

// const NewOrder = () => { 
//     const classes = useStyles();
//         return(

//            <div>
//                Test
//             </div>
          
//         )

// }

// export default NewOrder;



function createData(id, item, ammount, costperitem, total) {
  return { id, item, ammount, costperitem, total };
}

const rows = [
  createData(0, 'Keyboard', '3', '20', '60'),
  createData(1, 'Display', '2', '45', '90'),
  createData(2, 'iPad', '5', '100', '500'),
  createData(3, 'Macbook', '4', '200', '800'),
  createData(4, 'Surface', '5', '175', '875'),
];





const useStyles = makeStyles((theme) => ({
    
  // necessary for content to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    height: "100vh",
    overflow: "auto"
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
            <InputGroupText><PeopleIcon /></InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Client Name" />
        </InputGroup>
   
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Input addon type="checkbox" aria-label="Checkbox for following text input" />
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

    <div/>
    </main>
  );
};

export default Order;


// <MDBCol md="6">
//       <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
// </MDBCol>


{/* <InputGroup>
        <InputGroupAddon>
        <InputGroupText><SearchIcon /></InputGroupText>
        </InputGroupAddon>
        <MDBCol md="6">
        <MDBIcon icon="search" />
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" icon="Search"/>
        </MDBCol>
        </InputGroup> */}