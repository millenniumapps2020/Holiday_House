import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Authorized from './navigation/Authorized'

import PreLoginNavigation from './navigation/PreLoginNavigation'
import PostLoginNavigation from './navigation/PostLoginNavigation'

import { SCREENS, LOCAL_STORAGE } from './common/Constants'
import { getItemFromSessionStorage, storeToSessionStorage } from './common/LocalStorage'

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
      <BrowserRouter>
        <Switch>
          <Route exact path={SCREENS.BASE}
            render={(props) =>
              <BaseRouter {...props} loginStatus={this.state.loginStatus} />
            }
          />

          <Route path={SCREENS.PRELOGIN} component={PreLoginNavigation} />

          <Authorized path={SCREENS.HOME} component={PostLoginNavigation} />

          {this.state.loginStatus ?
            <Redirect to={SCREENS.HOME} />
            :
            <Redirect to={SCREENS.PRELOGIN} />
          }
        </Switch>
      </BrowserRouter>
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
