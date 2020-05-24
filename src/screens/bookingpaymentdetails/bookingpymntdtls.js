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
        selectedHouseName : "Sample House"
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
                                    <div className="UserDetailsBox col-md-6">
                                        <i class="fa fa-comment-o green lg"></i> <h4  className="">Your Details</h4>
                                        <form>
                                            <div className="row form-inline">
                                                <div className="col form-group">
                                                    <label>Name: </label>
                                                    <input type="email"  id="email" />
                                                    <div className="col">
                                                        <button type="button" class="btn btn-link">Edit</button>
                                                    </div>
                                                </div> 
                                                <div className="col form-group">
                                                    <label>Email: </label>
                                                    <input type="email"  id="email" />
                                                    <div className="col">
                                                        <button type="button" class="btn btn-link">Edit</button>
                                                    </div>
                                                </div> 
                                                <div className="col form-group">
                                                    <label>Phone: </label>
                                                    <input type="email"  id="email" />
                                                    <div className="col">
                                                        <button type="button" class="btn btn-link">Edit</button>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="border"></div>
                                            <div>
                                            <label>Your Message: </label>
                                                   <textarea class="form-control" rows="3"></textarea>
                                            </div>
                                            <div className="backGroundText">
                                                <p className="NoteText">Have a question before you book? <a>Message the owner</a></p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="BookingDetailsBox col-md-6">
                                        <div className="container BookingInnerbox">
                                            <h6 className="DetailNote">Booking Details</h6>
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