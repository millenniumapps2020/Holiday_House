import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Authorized from './navigation/Authorized'

import PreLoginNavigation from './navigation/PreLoginNavigation'
import PostLoginNavigation from './navigation/PostLoginNavigation'
import HomePage from './screens/home/HomePage'
import ShortList from './screens/postLogin/ShortlistPage'
import Maps from './components/MapComponent'


import { SCREENS, LOCAL_STORAGE } from './common/Constants'
import { getItemFromSessionStorage, storeToSessionStorage } from './common/LocalStorage'

import './assets/css/global.css'
import DetailsPage from './screens/details/DetailsPage';
import SearchPage from './screens/search/SearchPage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginStatus: (getItemFromSessionStorage(LOCAL_STORAGE.LOGIN_STATUS) === 'true') ? true : false
      // loginStatus: true
    }
  }

  render() {
    return (
      <div>
        <style>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" />
        </style>
        <BrowserRouter>
          <Switch>
            <Route exact path={SCREENS.HOME} component={HomePage} />
            <Route exact path={SCREENS.DETAILS} component={DetailsPage} />
            <Route exact path={SCREENS.SHORTLIST} component={ShortList} />
            <Route exact path={SCREENS.MAP} component={Maps} />
            <Route exact path={SCREENS.SEARCH} component={SearchPage} />
            <Route exact path={SCREENS.BASE} render={(props) => <BaseRouter {...props} loginStatus={this.state.loginStatus} />} />
            <Route path={SCREENS.PRELOGIN} component={PreLoginNavigation} />
            {/* <Authorized path={SCREENS.HOME} component={PostLoginNavigation} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


function BaseRouter(props) {
  return (
    props.loginStatus ?
      <Redirect to={SCREENS.HOME} />
      : <Redirect to={SCREENS.PRELOGIN} />
  );
}


export default App;
