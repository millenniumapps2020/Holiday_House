import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Authorized from './navigation/Authorized'

import PreLoginNavigation from './navigation/PreLoginNavigation'
import PostLoginNavigation from './navigation/PostLoginNavigation'
import HomePage from './screens/home/HomePage'
import ShortList from './screens/postLogin/ShortlistPage'
import Maps from './components/MapComponent';
import ListMyHouse from './screens/listmyhouse/listmyhouse'
import AppDialog from './components/AppDialogComponent'
import BookingPaymentDetails from './screens/bookingpaymentdetails/bookingpymntdtls'

import { SCREENS, LOCAL_STORAGE } from './common/Constants'
import { getItemFromSessionStorage, storeToSessionStorage } from './common/LocalStorage'

import './assets/css/global.css'
import DetailsPage from './screens/details/DetailsPage';
import SearchPage from './screens/search/SearchPage';
import AppUtils from './data/app_utils';
const publicIp = require('public-ip');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginStatus: (getItemFromSessionStorage(LOCAL_STORAGE.LOGIN_STATUS) === 'true') ? true : false,
      view: false,
      // loginStatus: true
    }
  }
  componentWillMount() {
    this.setUserDetails();
  }
  setUserDetails = async () => {
    var getUserDetails = await localStorage.getItem('userDetails');
    if (getUserDetails != null && getUserDetails != '' && Object.values(getUserDetails).length > 3) {
      var userDetails = JSON.parse(getUserDetails);
      AppUtils.setUserId(userDetails.userId);
      this.setState({ view: true })
    } else {
      var data = await publicIp.v4();
      var randomNumber = Math.floor(100000 + Math.random() * 900000);
      AppUtils.setUserId(randomNumber);
      this.setState({ view: true })
    }
  }

  render() {
    return this.state.view ? (
      <div>
        <style>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" />
        </style>
        <BrowserRouter>
          <Switch>
            <Route exact path={SCREENS.HOME} component={HomePage} />
            <Route path={SCREENS.DETAILS} component={DetailsPage} />
            <Route exact path={SCREENS.SHORTLIST} component={ShortList} />
            <Route exact path={SCREENS.MAP} component={Maps} />
            <Route exact path={SCREENS.SEARCH} component={SearchPage} />
            <Route exact path={SCREENS.BASE} render={(props) => <BaseRouter {...props} loginStatus={this.state.loginStatus} />} />
            <Route path={SCREENS.PRELOGIN} component={PreLoginNavigation} />
            <Route exact path={SCREENS.LISTMYHOUSE} component={ListMyHouse} />
            <Route exact path={SCREENS.BOOKINGPAYMENTDETAILS} component={BookingPaymentDetails} />
            {/* <Authorized path={SCREENS.HOME} component={PostLoginNavigation} /> */}
          </Switch>
        </BrowserRouter>

        <AppDialog />
      </div>
    ) : <div></div>;
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
