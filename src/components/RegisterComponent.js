import React, { Component } from 'react'

class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    gotoLogin = () => {
        this.props.loginCB && this.props.loginCB()
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
                            <input className="form-control" placeholder="Your first name" />
                            <div class="invalid inside-flex r-fname">
                                <div><span>Please enter your first name</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Last name *</div>
                            <input className="form-control" placeholder="Your last name" />
                            <div class="invalid inside-flex r-lname">
                                <div><span>Please enter your last name</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Email Address *</div>
                            <input className="form-control" placeholder="Email Address" />
                            <div class="invalid inside-flex r-email">
                                <div><span>Please enter your email</span></div>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Password</div>
                            <input className="form-control" placeholder="Password" />
                            <div class="invalid inside-flex r-password">
                                <div><span>Please enter your password</span></div>
                            </div>
                        </div>
                        <div className="btn-div">
                            <button className="btn registerBtn">
                                Create your account
                            </button>
                        </div>
                    </div>
                    <div className="social-div">
                        <div>Sign up with a different account</div>
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

export default RegisterComponent;