import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Dashboard from '../screens/postLogin/DashboardPage'

import { SCREENS } from '../common/Constants'

import Header from '../components/HeaderComponent'
import Footer from '../components/FooterComponent'

class PostLoginNavigation extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path={SCREENS.DASHBOARD} exact component={Dashboard} />
                    <Redirect to={SCREENS.DASHBOARD} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default PostLoginNavigation;