import React, { Component } from 'react'
import { connect } from "react-redux";

import { POST } from '../model/ApiCommunicator'
import { REGISTER } from '../model/ServiceURLs'

import { storeLoggedUser } from '../state/actions/actions'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            password: ""
        }
    }

    setValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    gotoLogin = () => {
        this.props.loginCB && this.props.loginCB()
    }

    register = () => {
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
        this.props.storeLoggedUser(response.result[0].firstName)
        this.props.closeDialogCB && this.props.closeDialogCB()
    }

    errorRespCBRegister = (error) => {
        console.log('error.message', error)
        alert(error)
    }

    render() {
        return (
            <div className="register-base">
                <div className="body">
                    <div className="details-div">
                        <div>
                            <span className="goto-login-btn" onClick={this.gotoLogin}>Back to sign in</span>
                        </div>
                        <h3 className="heading">Register with Holiday Houses</h3>
                        <div className="info-content">Required fields are marked with a star *</div>
                        <div className="input-div">
                            <div className="label">First name *</div>
                            <input className="form-control" placeholder="Your first name" name="firstName"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-fname">
                                <div><span>Please enter your first name</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Last name *</div>
                            <input className="form-control" placeholder="Your last name" name="lastName"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-lname">
                                <div><span>Please enter your last name</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Email Address *</div>
                            <input className="form-control" placeholder="Email Address" name="emailId"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-email">
                                <div><span>Please enter your email</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Password</div>
                            <input className="form-control" placeholder="Password" name="password"
                                onChange={(e) => this.setValue(e)}
                            />
                            <div class="invalid inside-flex r-password">
                                <div><span>Please enter your password</span></div>
                            </div>
                        </div>
                        <div className="btn-div">
                            <button className="btn registerBtn"
                                onClick={this.register}
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