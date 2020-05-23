import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import images from '../../assets/images'
import './ListMyHouseStyle.css';
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


class ListMyHouse extends Component {
    state = {
        streetAddress: '',
        suburb: '',
        city: '',
        postcode: '',
        country: '',
        mobile: '',
        dayPhone: '',
        eveningPhone: '',
        fax: '',
        freePhone: '',
        preferredcalltime: '',
    }

    inputFields = [
        {
            placeholder: "Street Address*",
            key: "streetAddress",
            type: "text"
        },
        {
            placeholder: "Suburb",
            key: "suburb",
            type: "text"
        },
        {
            placeholder: "City*",
            key: "city",
            type: "text"
        },
        {
            placeholder: "Country*",
            key: "country",
            type: "text"
        },
        {
            placeholder: "PostCode",
            key: "postcode",
            type: "number"
        },
        {
            placeholder: "Day Phone",
            key: "dayPhone",
            type: "number"
        },
        {
            placeholder: "Evening Phone",
            key: "eveningPhone",
            type: "number"
        },
        {
            placeholder: "Mobile Phone",
            key: "mobile",
            type: "number"
        },
        {
            placeholder: "Free Phone",
            key: "freePhone",
            type: "number"
        },
        {
            placeholder: "Fax",
            key: "fax",
            type: "number"
        },
        {
            placeholder: "Preferred call time e.g. After 5pm evening",
            key: "preferredcalltime",
            type: "text"
        },
    ];

    validateAndDoNextStep = () => {
        this.childsample && this.childsample()
        if (!this.state.streetAddress || !this.state.city || !this.state.country || !this.state.mobile) {
            alert("Required Fields cannot be empty");
        }

        if (this.state.mobile) {
            var phonePattern = /^\d{10}$/;
            if (!(this.state.mobile.match(phonePattern))) {
                alert("invalid phone number");
            }
        }
    }

    inputChange(item, value) {
        this.setState({ [item.key]: value })
    }

    render() {

        return (
            <div className="listMyHouse">
                <div className="fixed-top">
                    <HeaderComponent key="homeHeader" name="ram" parentCallsample={x => this.childsample = x} />
                </div>
                <div className="container-fluid banner col-md-12">
                    <div className="row backGroundImage" style={{ backgroundImage: `url(${images.common.banner_three})` }}>
                        <div className="logoSection col-md-8">
                            {/* <div > */}
                            <img className="logoImage"
                                src="https://www.holidayhouses.co.nz/ReactApp/images/brand/hh-footer-light.svg"
                            />
                            {/* </div> */}
                        </div>
                        <div className="formSection col-md-4">
                            <div className="formBox">
                                <div className="formTitle">
                                    <h4>List My House</h4>
                                    <p>Required Fields are shown with a star *</p>
                                </div>
                                <div class="formInputs">
                                    <div className="formTitle">
                                        <h4>Mailing Address</h4>
                                        <p>Not your holiday home Address</p>
                                    </div>
                                    <div className="container">

                                        {this.inputFields.map(item => {
                                            return (
                                                <input className="form-control inputTag"
                                                    value={this.state[item.key]}
                                                    onChange={(e) => this.inputChange(item, e.target.value)}
                                                    placeholder={item.placeholder}
                                                    type={item.type}
                                                />
                                            );
                                        })}
                                        <input type="checkbox" class="inputTag" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">I want to enter different billing details</label><br></br>
                                        <button type="button" class="btn btn-warning" onClick={() => this.validateAndDoNextStep()}>Next Step</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    }

}

export default ListMyHouse;