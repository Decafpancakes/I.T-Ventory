import React, {useState} from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {ReactDOM, element} from 'react-dom';
import PeopleIcon from "@material-ui/icons/People";
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



import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';




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
        <Input placeholder="Check it out" />
      </InputGroup>
      <br />

      <InputGroup>
        <Input placeholder="username" />
        <InputGroupAddon addonType="append">
          <InputGroupText>@example.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <br />

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Dolla dolla billz yo!" />
        <InputGroupAddon addonType="append">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>$</InputGroupText>
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