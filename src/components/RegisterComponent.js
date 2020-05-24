import React, { Component } from 'react'
import { connect } from "react-redux";

import LoaderComponent from './LoaderComponent'

import { POST } from '../model/ApiCommunicator'
import { REGISTER } from '../model/ServiceURLs'

import { storeLoggedUser } from '../state/actions/actions'

import { isValidEmail } from '../common/commonMethods'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fieldArray: ['firstName', 'lastName', 'emailId', 'password'],
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
            errorMsg: {},
            apiError: '',
            showLoader: false
        }
    }

    setValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoLogin = () => {
        this.props.loginCB && this.props.loginCB()
    }

    onClickRegister = () => {
        let error = {}
        let placeReq = true
        this.state.fieldArray.map((item) => {
            if (this.state[item]) {
                if (item === "emailId") {
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
            this.register()
    }

    register = () => {
        this.setState({ apiError: '', showLoader: true })
        let request = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            userType: "0",
            password: this.state.password
        }
        POST(REGISTER, request, this.successRespCBRegister, this.errorRespCBRegister);
    }

    successRespCBRegister = (response) => {
        alert('Registered Successfully')
        this.setState({ apiError: '', showLoader: false })
        this.props.storeLoggedUser(response.result[0].firstName)
        this.props.closeDialogCB && this.props.closeDialogCB()
    }

    errorRespCBRegister = (error) => {
        this.setState({ apiError: error, showLoader: false })
    }

    render() {
        const { errorMsg, showLoader } = this.state

        return (
            <div className="register-base">
                <div className="body">
                    <div className="details-div">
                        <div>
                            <span className="goto-login-btn" onClick={this.gotoLogin}>Back to sign in</span>
                        </div>
                        <h3 className="heading">Register with NZStays</h3>
                        <div className="info-content">Required fields are marked with a star *</div>
                        <div className={`input-div ${errorMsg['firstName'] ? errorMsg['firstName'].msg ? 'hasError' : '' : ''}`}>
                            <div className="label">First name *</div>
                            <input className="form-control" placeholder="Your first name" name="firstName"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-fname">
                                <div><span>{errorMsg['firstName'] ? errorMsg['firstName'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className={`input-div ${errorMsg['lastName'] ? errorMsg['lastName'].msg ? 'hasError' : '' : ''}`}>
                            <div className="label">Last name *</div>
                            <input className="form-control" placeholder="Your last name" name="lastName"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-lname">
                                <div><span>{errorMsg['lastName'] ? errorMsg['lastName'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className={`input-div ${errorMsg['emailId'] ? errorMsg['emailId'].msg ? 'hasError' : '' : ''}`}>
                            <div className="label">Email Address *</div>
                            <input className="form-control" placeholder="Email Address" name="emailId"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-email">
                                <div><span>{errorMsg['emailId'] ? errorMsg['emailId'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className={`input-div ${errorMsg['password'] ? errorMsg['password'].msg ? 'hasError' : '' : ''}`}>
                            <div className="label">Password *</div>
                            <input type="password" className="form-control" placeholder="Password" name="password"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-password">
                                <div><span>{errorMsg['password'] ? errorMsg['password'].msg : ''}</span></div>
                            </div>
                        </div>
                        <div className="apiErrorMsg">
                            {this.state.apiError}
                        </div>
                        <div className="btn-div">
                            <button className="btn registerBtn"
                                onClick={this.onClickRegister}
                            >
                                Create your account
                            </button>
                        </div>
                    </div>
                    {/* <div className="social-div">
                        <div>Sign up with a different account</div>
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


export default connect(null, mapDispatchToProps)(RegisterComponent);