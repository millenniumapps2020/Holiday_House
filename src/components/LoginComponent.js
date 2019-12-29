import React, { Component } from 'react'

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    onClickRegister = () => {
        this.props.registerCB && this.props.registerCB()
    }

    render() {
        return (
            <div className="login-base">
                <div className="body">
                    <div className="details-div">
                        <h3 className="heading">Sign in to Holiday Houses</h3>
                        <div className="input-div">
                            <div className="label">Email Address</div>
                            <input className="form-control" placeholder="Email Address" />
                        </div>
                        <div className="input-div">
                            <div className="label">Password</div>
                            <input className="form-control" placeholder="Password" />
                        </div>
                        <div className="btn-div">
                            <button className="btn loginBtn">
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

export default LoginComponent;