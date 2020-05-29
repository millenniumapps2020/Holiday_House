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
        selectedHouseName : "Sample House",
        bookingDetails : {
            checkInDate : "17 Jun",
            checkOutDate  : "20 Jun",
            Guests : "1 Adult",
            stayDays : '2nights@$110',
            stayPrice : '$220',
            extraCharges: [{
                serviceName : 'Cleaning Fee',
                serviceCharge : '$90'
            }],
            totalPrice : '$310.00 '
        },
        ownersPolicy : [{
            policyName : 'Cancellation Policy',
            policyDetails : ""
        }]
    }

    render() {

        return (
            <div className="BookingPaymentDetails">
                <div className="fixed-top">
                    <HeaderComponent key="homeHeader" name="ram" parentCallsample={x => this.childsample = x} />
                </div>
                <div className="BkngDetailsBody row">
                    <div className="sideSection col-md-2">
                    </div>
                    <div className="container col-md-8">
                        <div className="container mainbox">
                            <div className="container innerBox">
                                <p>{this.state.selectedHouseName} /Request Booking</p>
                                <h6 className="RequestFont">Request Booking For {this.state.selectedHouseName}</h6>
                                <p className="NoteText">Your booking will be processed through our secure platform. To keep your information safe, always use Holiday Houses to pay.</p>
                                <div className="DetailsSectionBox row">
                                    <div className="col-md-6">
                                        <div className="UserDetailsBox">
                                            <div className="container">
                                                <i class="fa fa-comment-o green lg"></i> <h4  className="">Your Details</h4>
                                                <form className="form-horizontal">
                                                    <div className="form-inline">
                                                        <div className="form-group">
                                                            <label className="control-label col-sm-2">Name:</label>
                                                            <div className="col-sm-10">
                                                                <input type="text"  class="form-control" maxLength="50"/>
                                                            </div>
                                                        </div>
                                                        <a className="EditButton">Edit</a>
                                                    </div>
                                                    <div className="form-inline form-Input">
                                                        <div className="form-group">
                                                            <label className="control-label col-sm-2">Email:</label>
                                                            <div className="col-sm-10">
                                                                <input type="email"  class="form-control" maxLength="50"/>
                                                            </div>
                                                        </div>
                                                        <a className="EditButton">Edit</a>
                                                    </div>
                                                    <div className="form-inline form-Input">
                                                        <div className="form-group">
                                                            <label className="control-label col-sm-2">Phone:</label>
                                                            <div className="col-sm-10">
                                                                <input type="number"  class="form-control" maxLength="50"/>
                                                            </div>
                                                        </div>
                                                        <a className="EditButton">Edit</a>
                                                    </div>
                                                    <div className="border"></div>
                                                    <div className="textField">
                                                    <label>Your Message: </label>
                                                        <textarea class="form-control" rows="3"></textarea>
                                                    </div>
                                                    <div className="backGroundText">
                                                        <p className="NoteText">Have a question before you book? <a>Message the owner</a></p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="OwnerPolicySection">
                                            <div className="container">
                                              <h4  className="">Owner's Policy</h4>
                                              <div className="PolicyDetails">
                                                 <h6  className="">Cancellation Policy</h6>
                                                 <p>If a cancellation is made within 7 days of check-in, you'll lose 100% of the total booking price.</p>
                                                 <p>A booking service charge of $75 applies to all cancellation refunds.</p>
                                              </div>
                                            </div>
                                        </div>
                                        <div className="Agreement">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"/>
                                                <label className="custom-control-label">I agree to the cancellation policy and terms and conditions</label>
                                            </div>
                                        </div>
                                        <div className = "buttonDiv">
                                        <button type="button" class="btn btn-warning btn-block" onClick={() => this.validateAndDoNextStep()}>Continue to Payment</button>
                                        </div>
                                        <div className = "crediText">
                                            <p>Your credit card will not be charged unless the booking is confirmed.</p>
                                        </div>
                                    </div>
                                    <div className="BookingDetailsBox col-md-6">
                                        <div className="container BookingInnerbox">
                                            <h6 className="DetailNote">Booking Details</h6>
                                            <div className="row container">
                                                <div className="CheckInDetails">
                                                    <h6>Check in</h6>
                                                    <p>{this.state.bookingDetails.checkInDate}</p>
                                                </div>
                                                <div className="CheckOutDetails">
                                                    <h6>Check out</h6>
                                                    <p>{this.state.bookingDetails.checkOutDate}</p>
                                                </div>
                                            </div>
                                            <div className="GuestDetails">
                                                <h6>Guests</h6>
                                                <p>{this.state.bookingDetails.Guests}</p>
                                            </div>
                                            <div className="border-dottted"></div>
                                            <div className="row container">
                                                <div className="stayDetails">
                                                    <p>{this.state.bookingDetails.stayDays}</p>
                                                </div>
                                                <div className="RateDetails">
                                                    <p>{this.state.bookingDetails.stayPrice}</p>
                                                </div>
                                            </div>
                                            <div className="border-dottted"></div>
                                            <div className="row container">
                                                {this.state.bookingDetails.extraCharges.map(item => {
                                                    return (
                                                        <div className="stayDetails">
                                                            <p>{item.serviceName}</p>
                                                        </div>
                                                    )
                                                   
                                                 })}
                                                 {this.state.bookingDetails.extraCharges.map(item => {
                                                     return (
                                                        <div className="RateDetails">
                                                            <p>{item.serviceCharge}</p>
                                                        </div>
                                                    )
                                                 })}
                                                
                                            </div>
                                            <div className="border"></div>
                                            <div className="row container">
                                                <div className="stayDetails">
                                                    <p>Total</p>
                                                </div>
                                                <div className="RateDetails">
                                                    <span className="Rate">{this.state.bookingDetails.totalPrice}</span><span>NZD</span>
                                                </div>
                                            </div>
                                            <div className="NotedText">
                                                <p>
                                                This payment will be charged by Holiday Houses on behalf of the property owner.
                                                </p>
                                                <p>
                                                Payments will be held in a secure trust account by Holiday Houses until after you have checked in.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bookimgSteps">
                                            <h6 className="DetailNote">How to book this house : </h6> 
                                            <div>
                                                <ol>
                                                    <li className="listtext">Fill out the attached form to get started with your booking.</li>
                                                    <li className="listtext">Read and agree to the owner’s policies and Holiday Houses terms and conditions.</li>
                                                    <li className="listtext">Complete the payment process - Your credit card will not be charged until the booking is confirmed.</li>
                                                    <li className="listtext">This booking is subject to confirmation by the owner, who will confirm or decline your booking within 36 hours. Booking details will be emailed to you along with a reference.</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sideSection col-md-2">
                    </div>
                </div>
            </div>
        )

    }

}

export default BookingPaymentDetails;