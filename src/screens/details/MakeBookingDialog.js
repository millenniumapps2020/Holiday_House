import React, { Component } from 'react'

import { isValidEmail } from '../../common/commonMethods'

class MakeBookingDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valueFields: ['first name', 'last name', 'email', 'phone', 'msg'],
            values: {},
            errorMsg: {},
            show: props.show
        }
    }

    componentWillReceiveProps(props) {
        if (props.show) {
            this.setState({ show: props.show, errorMsg: {}, values: {} })
        }
    }

    onChangeValue = (e) => {
        let value = Object.assign({}, this.state.values)
        value[e.target.name] = e.target.value
        this.setState({ values: value })
    }

    onClickContinue = () => {
        let error = {}
        let hasError = false
        this.state.valueFields.map((item) => {
            if (this.state.values[item] !== "msg") {
                if (this.state.values[item]) {
                    if (item === "email") {
                        if (!isValidEmail(this.state.values[item])) {
                            hasError = true
                            error[item] = {}
                            error[item].error = true
                            error[item].msg = "Invalid " + item
                        }
                    }
                } else {
                    hasError = true
                    error[item] = {}
                    error[item].error = true
                    error[item].msg = "Please enter your " + item
                }
            }
        })
        this.setState({ errorMsg: error })
    }

    closeDialog = () => {
        this.setState({ show: false })
    }

    render() {
        const { errorMsg } = this.state

        if (!this.state.show)
            return null
        else
            return (
                <div className="modal modal-makeBooking show fade makeBooking-dialog" id="myModal" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <button className="close-btn" onClick={this.closeDialog}>×</button>
                            <div className="content">
                                <div className="inputFields-div">
                                    <h4 id="heading">Make a booking</h4>
                                    <h4 id="heading2">Enter the details for your stay</h4>
                                    <div className="inputRow first">
                                        <div className="label">Name</div>
                                        <div className="inputDiv">
                                            <div className={`${errorMsg['first name'] ? errorMsg['first name'].error ? 'hasError' : '' : ''}`}
                                                style={{ flex: 1 }}
                                            >
                                                <input className="form-control" placeholder="First name(s)"
                                                    name="first name"
                                                    onChange={this.onChangeValue}
                                                />
                                                <div class="invalid inside-flex">
                                                    <span>{errorMsg['first name'] ? errorMsg['first name'].msg ? errorMsg['first name'].msg : '' : ''}</span>
                                                </div>
                                            </div>
                                            <div className={`${errorMsg['last name'] ? errorMsg['last name'].error ? 'hasError' : '' : ''}`}
                                                style={{ flex: 1 }}
                                            >
                                                <input className="form-control second" placeholder="Last name"
                                                    name="last name"
                                                    onChange={this.onChangeValue}
                                                />
                                                <div class="invalid inside-flex">
                                                    <span>{errorMsg['last name'] ? errorMsg['last name'].msg ? errorMsg['last name'].msg : '' : ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`inputRow lowWidth ${errorMsg['email'] ? errorMsg['email'].error ? 'hasError' : '' : ''}`}>
                                        <div className="label">Email</div>
                                        <div className="inputDiv">
                                            <input className="form-control" placeholder="Your contact email address"
                                                name="email"
                                                onChange={this.onChangeValue}
                                            />
                                            <div class="invalid inside-flex">
                                                <span>{errorMsg['email'] ? errorMsg['email'].msg ? errorMsg['email'].msg : '' : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`inputRow lowWidth ${errorMsg['phone'] ? errorMsg['phone'].error ? 'hasError' : '' : ''}`}>
                                        <div className="label">Phone</div>
                                        <div className="inputDiv">
                                            <input className="form-control" placeholder="Your contact phone number"
                                                name="phone"
                                                onChange={this.onChangeValue}
                                            />
                                            <div class="invalid inside-flex">
                                                <span>{errorMsg['phone'] ? errorMsg['phone'].msg ? errorMsg['phone'].msg : '' : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inputRow lowWidth">
                                        <div className="label">Your message</div>
                                        <div className="inputDiv">
                                            <textarea className="form-control" placeholder="eg. Age of children, special requirements, etc."
                                                name="msg"
                                                onChange={this.onChangeValue}
                                            />
                                        </div>
                                    </div>
                                    <div className="inputRow lowWidth">
                                        <button className="themeBtn"
                                            onClick={this.onClickContinue}
                                        >
                                            Continue
                                    </button>
                                    </div>
                                </div>
                                <div className="datePick-div">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )
    }
}

export default MakeBookingDialog;