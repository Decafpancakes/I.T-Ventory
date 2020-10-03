import React, {useState} from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SimpleLineChart from "./SimpleLineChart";
import SimpleTable from "./SimpleTable";
import Typography from '@material-ui/core/Typography';
import {ReactDOM, element} from 'react-dom';

const useStyles = makeStyles((theme) => ({
    
    // necessary for content to be below app bar
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
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
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  

const Clients = () => { 
    const classes = useStyles();
        return(
                // These 2 lines are needed to maek sure the information is below the app bar
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography variant="h4" gutterBottom component="h2">
                This is where the clients page will go once its finished!
                </Typography>
                <div/>
                </main>
        
        )

        ReactDOM.render(element, document.getElementById('root'));

}

export default Clients;