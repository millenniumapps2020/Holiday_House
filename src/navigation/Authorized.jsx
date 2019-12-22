import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';

import LoaderComponent from '../components/LoaderComponent'

import { SCREENS, LOCAL_STORAGE } from '../common/Constants'
import { getItemFromSessionStorage } from '../common/LocalStorage'

class Authorized extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // loginStatus: true,
            loginStatus: (getItemFromSessionStorage(LOCAL_STORAGE.LOGIN_STATUS) === 'true') ? true : false,
            loading: false
        }
    }

    render() {
        const { component: Component, ...rest } = this.props
        
        return (
            <Route {...rest} render={props => {
                return this.state.loginStatus
                    ? <Component {...props} />
                    : <Redirect to={SCREENS.PRELOGIN} />
            }} />
        );
    }
}

export default Authorized;

