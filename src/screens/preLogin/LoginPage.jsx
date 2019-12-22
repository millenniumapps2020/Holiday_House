import React, { Component } from 'react'

import { storeToSessionStorage } from '../../common/LocalStorage'
import { LOCAL_STORAGE, SCREENS } from '../../common/Constants'


class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onClickLogin = () => {
        storeToSessionStorage(LOCAL_STORAGE.LOGIN_STATUS, 'true')
        this.props.history.push(SCREENS.DASHBOARD)
    }

    render() {
        return (
            <div>
                Login Page

                <button onClick={this.onClickLogin}>LOGIN</button>

            </div>
        )
    }
}

export default LoginPage;