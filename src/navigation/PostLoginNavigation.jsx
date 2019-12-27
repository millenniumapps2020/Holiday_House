import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Dashboard from '../screens/postLogin/DashboardPage'
import ShortList from '../screens/postLogin/ShortlistPage'

import Header from '../components/HeaderComponent'
import Footer from '../components/FooterComponent'

import { SCREENS } from '../common/Constants'

class PostLoginNavigation extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path={SCREENS.DASHBOARD} exact component={Dashboard} />
                    <Route path={SCREENS.SHORTLIST} exact component={ShortList} />
                    <Redirect to={SCREENS.DASHBOARD} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default PostLoginNavigation;