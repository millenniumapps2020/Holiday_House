import React, { Component } from 'react'
import { connect } from "react-redux";

import LoaderComponent from './LoaderComponent'

import { POST } from '../model/ApiCommunicator'
import { LOGIN } from '../model/ServiceURLs'

import { storeLoggedUser } from '../state/actions/actions'

import { isValidEmail } from '../common/commonMethods';

import images from '../assets/images';
import AppUtils from '../data/app_utils';

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldArray: ['email', 'password'],
            email: "",
            password: "",
            showPassword: false,
            errorMsg: {},
            apiError: '',
            showLoader: false
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
        this.setState({ apiError: '' })
        let error = {}
        let placeReq = true
        this.state.fieldArray.map((item) => {
            if (this.state[item]) {
                if (item === "email") {
                    if (!isValidEmail(this.state[item])) {
                        placeReq = false
                        error[item] = {}
                        error[item].msg = 'Please enter valid ' + item
                    }
                }
            } else {
                placeReq = false
                error[item] = {}
                error[item].msg = 'Please enter ' + item
            }
        })

        this.setState({ errorMsg: error })

        if (placeReq)
            this.placeLoginReq()
    }

    placeLoginReq = () => {
        this.setState({ apiError: '', showLoader: true })
        let request = {
            emailId: this.state.email,
            password: this.state.password
        }
        POST(LOGIN, request, this.successRespCBLogin, this.errorRespCBLogin);
    }

    successRespCBLogin = (response) => {
        this.setState({ apiError: '', showLoader: false })
        this.props.storeLoggedUser({
            userName: response.result[0].firstName,
            isLogin: true
        })
        localStorage.setItem('userDetails', JSON.stringify(response.result[0]))
        AppUtils.setUserId(response.result[0].userId);
        this.props.closeDialogCB && this.props.closeDialogCB()
        window.location.reload()
    }

    errorRespCBLogin = (error) => {
        this.setState({ apiError: error, showLoader: false })
    }

    render() {
        const { showPassword, errorMsg, showLoader } = this.state

        return (
            <div className="login-base">
                <div className="body">
                    <div className="details-div">
                        <h3 className="heading">Sign in to NZStays</h3>
                        <div className={`input-div ${errorMsg['email'] ? errorMsg['email'].msg ? 'hasError' : '' : ''}`}>
                            <div className="label">Email Address</div>
                            <input className="form-control" placeholder="Email Address"
                                onChange={this.onChangeEmail}
                            />
                            <div class="invalid inside-flex email">
                                <div><span>{errorMsg['email'] ? errorMsg['email'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className={`input-div last ${errorMsg['password'] ? errorMsg['password'].msg ? 'hasError' : '' : ''}`}>
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
                                    {showPassword ?
                                        <button class="input-group-text show-pass-btn" onClick={this.hidePassword}>
                                            <img src={images.icons.visible_off} className="icon-symbol" />
                                        </button>
                                        :
                                        <button class="input-group-text hide-pass-btn" onClick={this.showPassword}>
                                            <img src={images.icons.visible_svg} className="icon-symbol" />
                                        </button>
                                    }
                                </div>
                            </div>
                            <div class="invalid inside-flex password">
                                <div><span>{errorMsg['password'] ? errorMsg['password'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className="apiErrorMsg">
                            {this.state.apiError}
                        </div>
                        <div className="btn-div">
                            <button className="btn loginBtn"
                                onClick={this.onClickLogin}
                            >
                                Sign in to NZStays
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
                    {/* <div className="social-div">
                        <div>Sign in with a different account</div>
                        <div>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/kev_svg.svg)" }}></button>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/google_svg.svg)" }}></button>
                            <button style={{ backgroundImage: "url(https://www.holidayhouses.co.nz/ReactApp/images/social/facebook_svg.svg)" }}></button>
                        </div>
                    </div> */}
                </div>
                {
                    showLoader ?
                        <LoaderComponent />
                        :
                        null
                }
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