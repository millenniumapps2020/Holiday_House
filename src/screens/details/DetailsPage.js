import React, { Component } from 'react';
import images from '../../assets/images';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import './css/DetailsPageStyle.css';
import Slider from "react-slick";

import Calendar from 'react-calendar';
import moment from 'moment';

import { PROPERTY_DETAILS, DISCOVER, ADD_REMOVE_SHORTLIST } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';
import HouseCardComponent from '../../components/HouseCardComponent';
import DateComponent from '../../components/DateComponent';
import GuestCountComponent from '../../components/GuestCountComponent';
import MapComponent from '../../components/MapComponent';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class DetailsPage extends Component {
    state = {
        propertyDetails: {},
        discoverList: []
    }
    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.getPerpertyDetails()
        this.getDiscoverList()
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    getPerpertyDetails() {
        var request = {
            "userId": "",
            "propertyId": this.props.location.state.propertyId
        };
        POST(PROPERTY_DETAILS, request, this.successRespCBDetails, this.errorRespCBDetails);
    }

    successRespCBDetails = (response) => {
        if (response.result.length > 0) {
            this.setState({ propertyDetails: response.result[0] });
        }

    }
    addShortList = () => {
        let request = {
            "userId": "1",
            "propertyId": this.props.location.state.propertyId
        }
        POST(ADD_REMOVE_SHORTLIST, request, this.successRespCBShortListAction, this.errorRespCBShortListAction);
    }

    successRespCBShortListAction = (response) => {
        console.log('response', response)
    }

    errorRespCBShortListAction = (error) => {
        console.log('response_error', error)

    }
    errorRespCBDetails = (error) => {
        console.log('error.message', error)
    }
    getDiscoverList = () => {
        var request = {
            "userId": "1",
            "limit": "9",
            "offset": "0"
        };
        POST(DISCOVER, request, this.successRespCBDiscover, this.errorRespDiscover);
    }
    successRespCBDiscover = (data) => {
        if (data.result.length > 0) {
            console.log('data.result', data.result)
            this.setState({ discoverList: data.result });
        }
    }
    errorRespCBDiscover = (error) => {

    }
    handleClickOutside = (event) => {
        var target = event.target;
        if (this.guestRef && !this.guestRef.contains(target)) {
            this.onGuestChange(false)
        }
        if (this.checkIndateRef && !this.checkIndateRef.contains(target)) {
            this.setState({ checkIndateVisible: false })
        }
        if (this.checkOutdateRef && !this.checkOutdateRef.contains(target)) {
            this.setState({ checkOutdateVisible: false })
        }
    }

    render() {
        const settings = {
            Center: true,
            focusOnSelect: true,
            infinite: false,
            slidesToScroll: 1,
            speed: 500
        };
        var { propertyDetails } = this.state;
        return (
            <div className="detailsPage">
                <HeaderComponent />
                {console.log('propertyDetails', propertyDetails)}
                {Object.keys(propertyDetails).length > 0 ?
                    <div>
                        <div className="container details-header">
                            <div className="row">
                                <div className="col-md-8 col-sm-12">
                                    <div class="bread-crumbs title-section">
                                        <a ><span>Canterbury</span></a>
                                        <span>&nbsp;/&nbsp;</span><a ><span>Christchurch</span></a>
                                        <span>&nbsp;/&nbsp;</span><a ><span>St Albans</span></a>
                                    </div>
                                    <div className="title-section">
                                        <h1 className="placeText">{propertyDetails.name}</h1>
                                        <p className="locationText">{propertyDetails.address}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 review-section">
                                    <div className="rate-review">
                                        <div className="star">
                                            <img src={images.icons.active_star} className="starImage" />
                                            <img src={images.icons.active_star} className="starImage" />
                                            <img src={images.icons.active_star} className="starImage" />
                                            <img src={images.icons.inactive_star} className="starImage" />
                                            <img src={images.icons.inactive_star} className="starImage" />
                                        </div>
                                        <div className="reviews">
                                            <a>1 &nbsp;&nbsp;review</a>
                                        </div>
                                    </div>
                                    <div className="addButton-wrap">
                                        <button type="button" class="btn btn-outline-secondary btn-block addButton" onClick={() => this.addShortList()}>Add to Shortlist </button>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <Slider {...settings}>
                            {[propertyDetails.Image].map((item) => {
                                console.log('item', item)
                                return (
                                    <div>
                                        <img src={item} resizeMode="contain" style={{ width: '100%', height: 450 }} />
                                    </div>)
                            })}
                        </Slider>
                        <div className="container details-body">
                            <div className="row details-full-wrap">
                                <div className="col-md-7 col-sm-12">
                                    <div className="feature-wrap row">
                                        <div className="col-md-4 col-4 features">
                                            <h3>{propertyDetails.maximumGuests}</h3>
                                            <p>Max Guest</p>
                                        </div>
                                        <div className="col-md-4 col-4 features">
                                            <h3>{propertyDetails.bedRooms}</h3>
                                            <p>Bedroom</p>
                                        </div>
                                        <div className="col-md-4 col-4 features">
                                            <h3>{propertyDetails.bathRooms}</h3>
                                            <p>Bathroom</p>
                                        </div>
                                    </div>
                                    <div className="decription-section">
                                        <h2 className="title">About this Holiday House</h2>
                                        <p>{propertyDetails.description}</p>
                                    </div>
                                    <div className="decription-section">
                                        <h2 className="title">Details and amenities</h2>
                                        <div className="details_amenties">
                                            <div className="row">
                                                <span className="col-6">
                                                    <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                    Child friendly
                                                </span>
                                                <span className="col-6">
                                                    <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/pets.png" />
                                                    Pet: please enquire
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="decription-section">
                                        <h2 className="title">Bed layout</h2>
                                        <p>1 Super King(s), 1 Super King(s), 1 Super King(s), 1 Cot(s), 2 Extra bed(s) available</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm12">
                                    <div className="booking-section">
                                        <div className="container">
                                            <div class="rate-section">
                                                <div >
                                                    <span>From</span>
                                                </div>
                                                <div>
                                                    <div class="rate-row">
                                                        <span class="rate">$300<sup ></sup></span>
                                                        <span>per night</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: 30 }}>
                                                <DateComponent />
                                            </div>
                                            <div style={{ marginTop: 30 }}>
                                                <GuestCountComponent />
                                            </div>
                                            <div style={{ marginTop: 30 }}>
                                                <button type="submit" id="submitSearchBtn" class="search-button btn btn-primary btn-block" onClick={this.onClickSuggestion}>
                                                    <span class="d-none d-sm-inline">Book</span>
                                                </button>
                                            </div>
                                            <p className="hint">
                                                You won't be charged yet
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container details-body">
                            <MapComponent />
                        </div>
                    </div> : null
                }
                {
                    this.state.discoverList.length > 0 ?
                        <div className="container-fluid discover-wrap details-dicover">
                            <div className="row">
                                <div className="container">
                                    <h1 className="suggestion-title">More Holiday Houses near Martinborough</h1>
                                </div>
                                <div className="discover-list-wrap">
                                    {this.state.discoverList.map((discoverItem) => {
                                        return (
                                            <div className="col-lg-3 col-sm-6" >
                                                <HouseCardComponent data={discoverItem} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        : null
                }
                <FooterComponent />
            </div >
        );
    }
}

export default DetailsPage;