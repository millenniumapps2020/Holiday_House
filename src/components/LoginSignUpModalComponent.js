import React, { Component } from 'react'

import Login from './LoginComponent'
import Register from './RegisterComponent'

class LoginSignUpModalComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showLogin: true
        }
    }

    closeDialog = () => {
        this.props.closeDialogCB && this.props.closeDialogCB()
    }

    showRegister = () => {
        this.setState({ showLogin: false })
    }

    showLogin = () => {
        this.setState({ showLogin: true })
    }

    render() {
        const { showLogin } = this.state

        return (
            <div class="modal modal-login show fade" id="myModal" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <button className="close-btn" onClick={this.closeDialog}>×</button>
                        {
                            showLogin ?
                                <Login registerCB={this.showRegister} />
                                :
                                <Register loginCB={this.showLogin} />
                        }
                    </div>
                </div>
                <div class="modal-backdrop fade show"></div>
            </div>

        )
    }
}

export default LoginSignUpModalComponent;