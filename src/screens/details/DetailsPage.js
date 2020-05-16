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
import { SCREENS } from '../../common/Constants';
import RatingStartComponent from '../../components/RatingStartComponent';

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
            "userId": "1",
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
        var { propertyDetails } = this.state;
        propertyDetails.favourite = propertyDetails.favourite == "0" ? "1" : "0";
        this.setState({ propertyDetails: propertyDetails });
    }

    successRespCBShortListAction = (response) => {
        var { propertyDetails } = this.state;
        if (response.message == "Removed short List") {
            propertyDetails.favourite = "0";
        } else {
            propertyDetails.favourite = "1";
        }
        this.setState({ propertyDetails });
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

    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    pageNavigation = (location) => {
        location = location != '' ? location : 'Hibiscus';
        this.props.history.push(SCREENS.SEARCH, { passvalue: { location } })
    }
    render() {
        const settings = {
            className: "slider variable-width",
            dots: false,
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
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
                                <div className="col-md-6 col-sm-12">
                                    <div class="bread-crumbs title-section">
                                        <a className="breadcum-link" onClick={() => this.pageNavigation(propertyDetails.location)}><span>{propertyDetails.location}</span></a>
                                        <span>&nbsp;/&nbsp;</span>
                                        <a className="breadcum-link" onClick={() => this.pageNavigation(propertyDetails.address)}><span>{propertyDetails.address}</span></a>
                                    </div>
                                    <div className="title-section">
                                        <h1 className="placeText">{propertyDetails.name}</h1>
                                        <p className="locationText">{propertyDetails.address}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 review-section">
                                    <span className="d-none d-md-block ">
                                        <div className="rate-review">
                                            <RatingStartComponent rating={propertyDetails.rating} />
                                            <div className="reviews">
                                                <a href="#reviews" className="breadcum-link">{propertyDetails.ratingDetails.length} reviews</a>
                                            </div>
                                        </div>
                                        <div className="addButton-wrap">
                                            <button type="button" class="btn btn-outline-secondary btn-block addButton" onClick={() => this.addShortList()}> {propertyDetails.favourite == "1" ? "Remove from shortlist" : "Add to Shortlist"}   <i className={(propertyDetails.favourite == "1" ? "red-color fas" : "far") + " fa-heart ml-3"}></i></button>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div >
                        {propertyDetails.images.length > 0 ?
                            <Slider {...settings}>
                                {propertyDetails.images.map((item) => {
                                    return (
                                        <div className="sliderWrap">
                                            <img
                                                src={item.imageUrl}
                                                resizeMode="contain"
                                            />
                                        </div>)
                                })}
                            </Slider>
                            : <div>
                                <img src={propertyDetails.Image} resizeMode="contain" style={{ width: '100%', height: 450 }} />
                            </div>}
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
                                                {propertyDetails.amenities.length > 0 ?
                                                    propertyDetails.amenities.map((item) => {
                                                        return <span className="col-6">
                                                            <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                            {item.name}
                                                        </span>
                                                    }) : null}
                                            </div>
                                            {propertyDetails.features.length > 0 ?
                                                <div className="col mt-3">
                                                    <div class="amenties-subhead row">Features</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.features.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.feature}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}
                                            {propertyDetails.basics.length > 0 ?
                                                <div className="col mt-3">
                                                    <div class="amenties-subhead row">Basics</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.basics.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}
                                            {propertyDetails.bathroom.length > 0 ?
                                                <div className="col mt-3">
                                                    <div class="amenties-subhead row">Bathroom</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.bathroom.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}
                                            {propertyDetails.heatcool.length > 0 ?
                                                <div className="col  mt-3">
                                                    <div class="amenties-subhead row">Heatcool</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.heatcool.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}

                                            {propertyDetails.kitchen.length > 0 ?
                                                <div className="col  mt-3">
                                                    <div class="amenties-subhead row">Heatcool</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.kitchen.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}

                                            {propertyDetails.laundry.length > 0 ?
                                                <div className="col  mt-3">
                                                    <div class="amenties-subhead row">Heatcool</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.laundry.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}

                                            {propertyDetails.parking.length > 0 ?
                                                <div className="col  mt-3">
                                                    <div class="amenties-subhead row">Heatcool</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.parking.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}
                                            {propertyDetails.others.length > 0 ?
                                                <div className="col  mt-3">
                                                    <div class="amenties-subhead row">Heatcool</div>
                                                    <div className="row  mt-2">
                                                        {propertyDetails.others.map((item) => {
                                                            return <span className="col-6">
                                                                <img src="https://www.holidayhouses.co.nz/ReactApp/images/amenities/child.png" />
                                                                {item.name}
                                                            </span>
                                                        })}
                                                    </div>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                    <div className="decription-section">
                                        <h2 className="title">Bed layout</h2>
                                        <p>1 Super King(s), 1 Super King(s), 1 Super King(s), 1 Cot(s), 2 Extra bed(s) available</p>
                                    </div>

                                    <div className="decription-section ">
                                        <div className="d-md-flex justify-content-md-between align-items-md-center">
                                            <h2 className="title">Reviews</h2>
                                            <div>
                                                <div class="d-md-inline-flex">
                                                    <span class="strong mr-2">Average Rating: {Math.floor(propertyDetails.rating)}</span>
                                                    <span><RatingStartComponent rating={propertyDetails.rating} /></span>
                                                </div>
                                                <div class="d-md-inline-flex ml-3">
                                                    <span class="strong">{propertyDetails.ratingDetails.length} total reviews</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="full-review-wrap">
                                            {propertyDetails.ratingDetails.map((item) => {
                                                return (
                                                    <div className="individual-review-wrap">
                                                        <div class="flex-align"><span class="name">{item.name}</span>
                                                            <span><RatingStartComponent rating={item.rating} /></span>
                                                        </div>
                                                        <div className="date">{item.createDate}</div>
                                                        <div className="description">{item.description}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
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
                                                <DateComponent setDate={(date, key) => { this.setState({ [key]: date }) }} />
                                            </div>
                                            <div style={{ marginTop: 30 }}>
                                                <GuestCountComponent onSetGuestDetails={(details) => this.setState({ guest_details: details })} />
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
                            <h2 class="title mt-3">Location</h2>
                            {Object.keys(this.state.propertyDetails).length > 0 ?
                                <MapComponent name="detailsComponent" maplist={[this.state.propertyDetails]} /> : null}
                        </div>

                        {
                            propertyDetails.nearByDetails.length > 0 ?
                                <div className="container-fluid discover-wrap details-dicover">
                                    <div className="row">
                                        <div className="container">
                                            <h1 className="suggestion-title">More NZStays near {propertyDetails.location}</h1>
                                        </div>
                                        <div className="discover-list-wrap">
                                            {propertyDetails.nearByDetails.map((discoverItem) => {
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
                    </div> : null
                }

                <FooterComponent />
            </div >
        );
    }
}

export default DetailsPage;