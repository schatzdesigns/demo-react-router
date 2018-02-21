import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Login from "./components/auth/Login";
import Reset from "./components/auth/Reset";
import Register from "./components/auth/Register";

import Full from "./containers/Full";
import {PrivateRoute} from "./containers/PrivateRoute";
import {alertActions} from "./_actions/alerts.actions";
import {history} from './_helpers';

class App extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>

                        <PrivateRoute exact path="/" component={Full}/>

                        <Route exact path="/login" name="Login" component={Login}/>
                        <Route exact path="/register" name="Register" component={Register}/>
                        <Route exact path="/reset" name="Reset Password" component={Reset}/>

                        {/*<Route exact path="/404" name="Page 404" component={Page404}/>
                        <Route exact path="/500" name="Page 500" component={Page500}/>*/}

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};