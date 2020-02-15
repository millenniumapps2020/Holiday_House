import React, { Component } from 'react'
import { connect } from "react-redux";

import { POST } from '../model/ApiCommunicator'
import { LOGIN } from '../model/ServiceURLs'

import { storeLoggedUser } from '../state/actions/actions'

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false
        }
    }

    onClickRegister = () => {
        this.props.registerCB && this.props.registerCB()
    }

    showPassword = () => {
        this.setState({ showPassword: true })
    }

    hidePassword = () => {
        this.setState({ showPassword: false })
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onClickLogin = () => {
        let request = {
            emailId: this.state.email,
            password: this.state.password
        }
        POST(LOGIN, request, this.successRespCBLogin, this.errorRespCBLogin);
    }

    successRespCBLogin = (response) => {
        this.props.storeLoggedUser(response.result[0].firstName)
        this.props.closeDialogCB && this.props.closeDialogCB()
    }

    errorRespCBLogin = (error) => {
        console.log('error.message', error)
        alert(error)
    }

    render() {
        const { showPassword } = this.state

        return (
            <div className="login-base">
                <div className="body">
                    <div className="details-div">
                        <h3 className="heading">Sign in to Holiday Houses</h3>
                        <div className="input-div">
                            <div className="label">Email Address</div>
                            <input className="form-control" placeholder="Email Address"
                                onChange={this.onChangeEmail}
                            />
                            <div class="invalid inside-flex email">
                                <div><span>Please enter a valid email</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label password-label">
                                <span>Password</span>
                                <span className="forgrt-password-btn">I forget my password</span>
                            </div>
                            <div class="input-group mb-3">
                                <input type={showPassword ? "text" : "password"}
                                    class="form-control" aria-label="Default"
                                    placeholder="Password" aria-describedby="inputGroup-sizing-default"
                                    onChange={this.onChangePassword}
                                />
                                <div class="input-group-append">
                                    {
                                        showPassword ?
                                            <button class="input-group-text show-pass-btn" onClick={this.hidePassword}>Hide</button>
                                            :
                                            <button class="input-group-text hide-pass-btn" onClick={this.showPassword}>Show</button>
                                    }
                                </div>
                            </div>
                            <div class="invalid inside-flex password">
                                <div><span>Please enter your password</span></div>
                            </div>
                        </div>
                        <div className="btn-div">
                            <button className="btn loginBtn"
                                onClick={this.onClickLogin}
                            >
                                Sign in to Holiday Houses
                            </button>
                        </div>
                        <div className="option-div">
                            <div>
                                <input type="checkbox" className="remember-box" />
                                <span className="option-text">Remember me</span>
                            </div>
                            <div>
                                <span className="option-text">Not a member?</span>
                                <span className="registerHere-btn" onClick={this.onClickRegister}>register here</span>
                            </div>
                        </div>
                    </div>
                    <div className="social-div">
                        <div>Sign in with a different account</div>
                        <div>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/kev_svg.svg)" }}></button>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/google_svg.svg)" }}></button>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/facebook_svg.svg)" }}></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeLoggedUser: (data) => { dispatch(storeLoggedUser(data)) }
    };
};

export default connect(null, mapDispatchToProps)(LoginComponent);