import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Dashboard from '../screens/postLogin/DashboardPage'

import { SCREENS } from '../common/Constants'

class PostLoginNavigation extends Component {
    render() {
        return (
            <Switch>
                <Route path={SCREENS.DASHBOARD} exact component={Dashboard} />
                <Redirect to={SCREENS.DASHBOARD} />
            </Switch>
        )
    }
}

export default PostLoginNavigation;