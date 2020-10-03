import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Button, Typography} from '@material-ui/core'
import { Menu } from '@material-ui/icons'


function App() {
    return (
        <div>
        <AppBar position='static'>
            <Toolbar>
                <IconButton color='inherit' edge='start' aria-label='menu'>
                    <Menu/>
                </IconButton>
                <Typography veriant = 'h6'>
                    I.T Ventory
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default App;