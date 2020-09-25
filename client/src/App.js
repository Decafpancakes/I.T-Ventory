import React from "react";
import Dashboard from "./components/Dashboard";
import NewOrder from "./components/Orders";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path ="/orders" component={NewOrder}/>
        </Switch>
    </BrowserRouter>
    )
}


export default App;
