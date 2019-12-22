import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Login from '../screens/preLogin/LoginPage'

import { SCREENS } from '../common/Constants'

class PreLoginNavigation extends Component {
    render() {
        return (
            <Switch>
                <Route path={SCREENS.LOGIN} exact component={Login} />
                <Redirect to={SCREENS.LOGIN} />
            </Switch>
        )
    }
}

export default PreLoginNavigation;