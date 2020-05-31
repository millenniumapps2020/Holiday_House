import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import images from '../../assets/images'
import './bookingpymntdtls.css';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import HouseCard from '../../components/HouseCardComponent';
import Calendar from 'react-calendar';
import moment from 'moment';

import { SCREENS } from '../../common/Constants'
import PlacesSearchComponent from '../../components/PlacesSearchComponent';
import { SUGGESTION, PROPERTY, PERFECTS } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';

const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'Elm',
        year: 2012
    },
];


class BookingPaymentDetails extends Component {
    state = {
        selectedHouseName: "Tui Units ...... Hot tub, Pool, Wifi close to lake",
        bookingDetails: {
            checkInDate: "17 Jun",
            checkOutDate: "20 Jun",
            Guests: "1 Adult",
            stayDays: '2nights@$110',
            stayPrice: '$1,050.00',
            extraCharges: [{
                serviceName: 'Cleaning Fee',
                serviceCharge: '$90'
            }],
            totalPrice: '$310.00 '
        },
        ownersPolicy: [{
            policyName: 'Cancellation Policy',
            policyDetails: ""
        }],
        bookingSteps: [
            "Fill out the attached form to get started with your booking.",
            "Read and agree to the owner’s policies and Holiday Houses terms and conditions.",
            "Complete the payment process - Your credit card will not be charged until the booking is confirmed.",
            "This booking is subject to confirmation by the owner, who will confirm or decline your booking within 36 hours. Booking details will be emailed to you along with a reference."
        ],
    }

    render() {

        return (
            <div className="BookingPaymentDetails">
                <div className="fixed-top">
                    <HeaderComponent key="homeHeader" name="ram" parentCallsample={x => this.childsample = x} />
                </div>
                <div className="Container-fluid mainbox d-flex justify-content-center">
                    <div className="col-lg-11">
                        <div className="header-wrap">
                            <p className="breadcrumb-wrap"> <a className="breadcrumb-link">{this.state.selectedHouseName}</a> /Request Booking</p>
                            <h6 className="title-text">Request Booking For {this.state.selectedHouseName}</h6>
                            <p className="NoteText">Your booking will be processed through our secure platform. To keep your information safe, always use Holiday Houses to pay.</p>
                        </div>
                        <div className="DetailsSectionBox row">
                            <div className="user-details-box col-md-7">
                                <div className="UserDetailsBox">
                                    <div className="d-inline-flex">
                                        <img src={images.icons.comment} class="details-comment-icon" />
                                        <h4 className="details-title">Your Details</h4>
                                    </div>
                                    <form className="form-horizontal">
                                        <div className="d-flex">
                                            <label className="control-label">Name:</label>
                                            <input type="text" class="form-control hs-toggle-input" placeholder="Your Name" maxLength="50" />
                                            <div className="edit-wrap">
                                                <img src={images.icons.edit} className="edit-icon" />
                                                        Edit
                                                </div>
                                        </div>
                                        <div className="d-flex">
                                            <label className="control-label">Email:</label>
                                            <input type="text" class="form-control hs-toggle-input" placeholder="Your Email" maxLength="50" />
                                            <div className="edit-wrap">
                                                <img src={images.icons.edit} className="edit-icon" />
                                                        Edit
                                                </div>
                                        </div>
                                        <div className="d-flex">
                                            <label className="control-label">Phone:</label>
                                            <input type="text" class="form-control hs-toggle-input" placeholder="Your phone number" maxLength="50" />
                                            <div className="edit-wrap">
                                                <img src={images.icons.edit} className="edit-icon" />
                                                        Edit
                                                </div>
                                        </div>
                                        <div className="message-wrap">
                                            <label className="control-label  mb-3">Your Message: </label>
                                            <textarea type="text" class="form-control" rows="3"></textarea>
                                            <div className="question-wrap">
                                                <p className="control-label">Have a question before you book? <a className="owner-link">Message the owner</a></p>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="OwnerPolicySection">
                                    <div className="d-inline-flex ">
                                        <img src={images.icons.paper} class="details-comment-icon" />
                                        <h4 className="details-title">Owner's Policy</h4>
                                    </div>
                                    <div className="details-wrap">
                                        <h6 className="title">Extra details</h6>
                                        <p>This owner charges a 10% deposit at the time of booking.
                                        <br />
                                        You will be charged a
                                        10% deposit of
                                        $143.00
                                        when the booking is confirmed.
                                        <br />
                                        The balance of
                                        $1,287.00
                                        will be charged to your credit card on
                                        12/06/2020.
                                        </p>
                                    </div>
                                    <div className="details-wrap">
                                        <h6 className="title">Cancellation Policy</h6>
                                        <p>If a cancellation is made within 7 days of check-in, you'll lose 100% of the total booking price.</p>
                                        <p>A booking service charge of $75 applies to all cancellation refunds.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="BookingDetailsBox col-md-5">
                                <div className="BookingInnerbox">
                                    <h6 className="DetailNote">Booking Details</h6>
                                    <div className="d-flex date-details-wrap">
                                        <div className="booking-details">
                                            <h6>Check in</h6>
                                            <p className="d-flex justify-content-between align-items-center">
                                                <span>{this.state.bookingDetails.checkInDate}</span>
                                                <span className="arrow-style">⟶</span>
                                            </p>
                                        </div>
                                        <div className="booking-details">
                                            <h6>Check out</h6>
                                            <p>{this.state.bookingDetails.checkOutDate}</p>
                                        </div>
                                    </div>
                                    <div className="booking-details">
                                        <h6>Guests</h6>
                                        <p>{this.state.bookingDetails.Guests}</p>
                                    </div>
                                    <div className="border-dottted"></div>
                                    <div className="rate-details d-flex justify-content-between">
                                        <span>
                                            <p>{this.state.bookingDetails.stayDays}</p>
                                        </span>
                                        <span>
                                            <p>{this.state.bookingDetails.stayPrice}</p>
                                        </span>
                                    </div>

                                    <div className="border-dottted" />
                                    {this.state.bookingDetails.extraCharges.map(item => {
                                        return (<div className="rate-details d-flex justify-content-between">
                                            <span>
                                                <p>{item.serviceName}</p>
                                            </span>
                                            <span>
                                                <p>{item.serviceCharge}</p>
                                            </span>
                                        </div>);
                                    })}
                                    <div className="border"></div>
                                    <div className="rate-details d-flex justify-content-between">
                                        <span>
                                            <p>Deposit</p>
                                        </span>
                                        <span>
                                            <p>{this.state.bookingDetails.stayPrice}</p>
                                        </span>
                                    </div>
                                    <div className="rate-details d-flex justify-content-between">
                                        <span>
                                            <p>Remaining</p>
                                        </span>
                                        <span>
                                            <p>$1,287.00</p>
                                        </span>
                                    </div>
                                    <div className="border" />
                                    <div className="rate-details d-flex justify-content-between">
                                        <span>
                                            <p>Total</p>
                                        </span>
                                        <span className="total-rate-span">
                                            <span class="symbol">$</span>
                                            <span class="number">1,287</span>
                                            <span class="float">.00</span>
                                            <span class="money">NZD</span>
                                        </span>
                                    </div>
                                    <div className="NotedText">
                                        <p>
                                            This payment will be charged by Holiday Houses on behalf of the property owner.
                                            Payments will be held in a secure trust account by Holiday Houses until after you have checked in.
                                        </p>
                                    </div>
                                </div>
                                <div className="booking-steps">
                                    <h6 className="title">How to book this house : </h6>
                                    {this.state.bookingSteps.map((item, index) => {
                                        return (
                                            <div className="steps">
                                                <div>
                                                    {index + 1}
                                                </div>
                                                <div >
                                                    <p>{item}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="action-wrap col-md-12">
                                <div className="Agreement">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <input type="checkbox" value={true} className="agree-chekbox" />
                                        <label >I agree to the cancellation policy and <a className="privacy-link">terms and conditions</a></label>
                                    </div>
                                </div>
                                <div className="buttonDiv">
                                    <div className="btn-div">
                                        <button
                                            className="btn continue-btn"
                                            onClick={this.onClickLogin}
                                            onClick={() => this.validateAndDoNextStep()}
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                                <div className="crediText">
                                    <p>Your credit card will not be charged unless the booking is confirmed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )

    }

}

export default BookingPaymentDetails;