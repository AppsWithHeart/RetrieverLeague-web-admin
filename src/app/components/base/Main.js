/**
 * Created by uroszivaljevic on 9/30/17.
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";

import Home from "../pages/Home";
import Contests from "../pages/Contests";
import Dogs from "../pages/Dogs";
import ContestDetails from "../pages/ContestDetails";
import Scores from "../pages/Scores";

export default class Main extends React.Component {

    render() {
        return (
            <Grid fluid={false}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/dogs" component={Dogs}/>
                    <Route exact path="/contests" component={Contests}/>
                    <Route path="/contests/:id" component={ContestDetails}/>
                    <Route exact path="/scores" component={Scores}/>
                </Switch>
            </Grid>
        )
    }
}