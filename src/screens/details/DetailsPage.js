import React, { Component } from 'react';
import Slider from "react-slick";

import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import DateRangeComponent from '../../components/DateRangeComponent';
import images from '../../assets/images';
import './css/DetailsPageStyle.css';
import './css/makeBookingDialog.css';

import { PROPERTY_DETAILS, DISCOVER, ADD_REMOVE_SHORTLIST } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';
import HouseCardComponent from '../../components/HouseCardComponent';
import DateComponent from '../../components/DateComponent';
import GuestCountComponent from '../../components/GuestCountComponent';
import MapComponent from '../../components/MapComponent';
import { SCREENS } from '../../common/Constants';
import RatingStartComponent from '../../components/RatingStartComponent';
import GalleryPage from './GalleryPage';
import LoaderComponent from '../../components/LoaderComponent';
import MakeBookingDialog from './MakeBookingDialog';

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
        discoverList: [],
        loader: true,
        fullAmentiesView: false,
        fullReviewView: false,
        showGallery: false,
        checkIndate: '',
        checkOutdate: '',
        dateError: false,
        showMakebookingDialog: false,
        bookingPopUpModel: false,
    }
    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.getPerpertyDetails()
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    getPerpertyDetails() {
        this.setState({ loader: true })
        var request = {
            "userId": "1",
            "propertyId": this.props.location.state.propertyId
        };
        POST(PROPERTY_DETAILS, request, this.successRespCBDetails, this.errorRespCBDetails);
    }

    successRespCBDetails = (response) => {
        this.setState({ loader: false })
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
        this.setState({ loader: false })
        console.log('error.message', error)
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
        this.props.location.state.propertyId = item.propertyId;
        this.getPerpertyDetails()
    }
    pageNavigation = (location) => {
        location = location != '' ? location : 'Hibiscus';
        this.props.history.push(SCREENS.SEARCH, { passvalue: { location } })
    }
    amentiesViewChange = () => {
        this.setState({ fullAmentiesView: !this.state.fullAmentiesView });
    }
    reviewViewChange = () => {
        this.setState({ fullReviewView: !this.state.fullReviewView });
    }

    onClickBook = () => {
        this.setState({ showMakebookingDialog: true })
    }
    dateErroralert = () => {
        this.setState({ dateError: true })
    }
    getDateDifferents(date1String, date2String) {
        var splitDate1 = date1String.split('/');
        var splitDate2 = date2String.split('/');
        if (splitDate1.length == 3 && splitDate2.length == 3) {
            const date1 = new Date(splitDate1[1] + '/' + splitDate1[0] + '/' + splitDate1[2]);
            const date2 = new Date(splitDate2[1] + '/' + splitDate2[0] + '/' + splitDate2[2]);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays != NaN ? diffDays : 0;
        } else {
            return 0;
        }
    }
    setDateValue(date, key) {
        this.setState({ [key]: date, dateError: false })
    }
    bookingModel = () => {
        this.setState({ bookingPopUpModel: true })
    }

    closeDialog = () => {
        this.setState({ bookingPopUpModel: false })
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
        var { propertyDetails, loader, fullAmentiesView, fullReviewView, showGallery, showMakebookingDialog, dateError } = this.state;

        var dates = this.getDateDifferents(this.state.checkIndate, this.state.checkOutdate);
        var total = (+propertyDetails.amount) * (dates);
        var bookingComponent = <div className="booking-section">
            <div className="container">
                <div class="rate-section">
                    <div >
                        <span>From</span>
                    </div>
                    <div>
                        <div class="rate-row">
                            <span class="rate">${propertyDetails.amount}<sup ></sup></span>
                            <span>per night</span>
                        </div>
                    </div>
                </div>
                {dateError ?
                    <div className="date-error-wrap">
                        <p className="text-danger">Please select a check in and check out date</p>
                    </div>
                    : null}
                <div style={{ marginTop: 30 }}>
                    <DateComponent setDate={(date, key) => this.setDateValue(date, key)} />
                </div>
                <div style={{ marginTop: 30 }}>
                    <GuestCountComponent type="detailsPage" onSetGuestDetails={(details) => this.setState({ guest_details: details })} />
                </div>
                {(+total) > 0 ?
                    <div style={{ marginTop: 30 }}>
                        <div className="flex-align">
                            <p>
                                ${propertyDetails.amount} x nights
                    </p>
                            <span className="strong">
                                ${total}
                            </span>
                        </div>
                        <div className="flex-align total-wrap">
                            <span className="strong">
                                Total
                    </span>
                            <span className="strong">
                                ${total}
                            </span>
                        </div>
                    </div>
                    : null}
                <div style={{ marginTop: 30 }}>
                    <button type="submit" id="submitSearchBtn"
                        className="search-button btn btn-primary btn-block"
                        onClick={total > 0 ? this.onClickBook : this.dateErroralert}
                    >
                        <span class="d-sm-inline">Book</span>
                    </button>
                </div>
                <p className="hint">
                    You won't be charged yet
                </p>
            </div>
        </div>;

        return (
            <div className="detailsPage">
                <HeaderComponent />
                {loader ?
                    <div className="loader-search-wrap">
                        <LoaderComponent height={"100%"} />
                    </div>
                    : null}
                {!loader && Object.keys(propertyDetails).length > 0 ?
                    showGallery ?
                        <GalleryPage images={propertyDetails.images}
                            name={propertyDetails.name}
                            onClickBack={() => this.setState({ showGallery: false })}
                        />
                        :
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
                                <div className="slider-base">
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
                                    <div className="viewGalary-btn-div">
                                        <button className="viewGalary-btn"
                                            onClick={() => this.setState({ showGallery: true })}
                                        >
                                            View Gallery
                                    </button>
                                    </div>
                                </div>
                                : <div>
                                    <img src={propertyDetails.Image} resizeMode="contain" style={{ width: '100%', height: 450 }} />
                                </div>
                            }
                            <div className="container details-body">
                                <div className="row details-full-wrap">
                                    <div className="col-lg-8  col-md-12 col-sm-12">
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
                                            <h2 className="title ">Details and amenities</h2>
                                            <div className="details_amenties mt-3">
                                                <div className="row">
                                                    {propertyDetails.amenities.length > 0 ?
                                                        propertyDetails.amenities.map((item) => {
                                                            return <span className="col-6">
                                                                <img src={item.image} />
                                                                {item.name}
                                                            </span>
                                                        }) : null}
                                                </div>
                                                {fullAmentiesView ? <div>
                                                    {propertyDetails.features.length > 0 ?
                                                        <div className="col mt-3">
                                                            <div class="amenties-subhead row">Features</div>
                                                            <div className="row  mt-2">
                                                                {propertyDetails.features.map((item) => {
                                                                    return <span className="col-6">
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
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
                                                                        <img src={item.image} />
                                                                        {item.name}
                                                                    </span>
                                                                })}
                                                            </div>
                                                        </div>
                                                        : null}</div>
                                                    : null}
                                            </div>
                                            <div className="mt-3">
                                                <span class="breadcum-link" onClick={this.amentiesViewChange}><i class={fullAmentiesView ? "fa fa-xs fa-minus" : "fa fa-xs fa-plus"}></i>View {fullAmentiesView ? "less" : "More"} </span>
                                            </div>
                                        </div>
                                        <div className="decription-section">
                                            <h2 className="title">Bed layout</h2>
                                            <p>1 Super King(s), 1 Super King(s), 1 Super King(s), 1 Cot(s), 2 Extra bed(s) available</p>
                                        </div>

                                        <div className="decription-section" id="reviews">
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
                                                {(fullReviewView ? propertyDetails.ratingDetails : propertyDetails.ratingDetails.slice(0, 2)).map((item) => {
                                                    return (
                                                        <div className="individual-review-wrap">
                                                            <div class="flex-align"><span class="name">{item.name}</span>
                                                                <span><RatingStartComponent rating={item.rating} /></span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="decription-section">
                                            <h2 className="title">Availability</h2>
                                            <div className="mt-3">
                                                <DateRangeComponent numberMonth={2} />
                                            </div>
                                        </div>

                                        <div className="decription-section">
                                            <h2 className="title">Rates</h2>
                                            <div className="mt-3">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Date range</th>
                                                            <th scope="col">Rates</th>
                                                            <th scope="col">Minimum stay</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>15 May 2020 - 03 Sep 2020</td>
                                                            <td>${+(propertyDetails.amount) * 2} / Night</td>
                                                            <td>2 Nights</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 d-none d-lg-block">
                                        {bookingComponent}
                                    </div>
                                </div>
                            </div>
                            <div className="container details-body">
                                <h2 class="title mt-3">Location</h2>
                                {Object.keys(this.state.propertyDetails).length > 0 ?
                                    <MapComponent name="detailsComponent" maplist={[this.state.propertyDetails]} /> : null}
                            </div>
                            {propertyDetails.nearByDetails.length > 0 ?
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
                {!loader && Object.keys(propertyDetails).length > 0 ?
                    <div className="bottom-booking-wrap d-lg-none">
                        <button
                            className="search-button btn btn-primary "
                            onClick={this.bookingModel}
                        >
                            <span class="button-text col">Book</span>
                            <span class="button-price col-auto"><strong>${propertyDetails.amount}</strong> per night</span>
                        </button>
                    </div>
                    : null
                }
                {
                    !loader ?
                        <FooterComponent />
                        : null
                }
                <div className="modal modal-booking show fade makeBooking-dialog  d-lg-none" id="myModal" role="dialog" style={{ display: this.state.bookingPopUpModel ? "block" : "none" }}>
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="col-lg-12 col-md-12 col-sm-10">
                            <div className="modal-content">
                                <div className="content">
                                    <button className="close-btn" onClick={this.closeDialog}>×</button>
                                    {bookingComponent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MakeBookingDialog show={showMakebookingDialog} />
            </div>
        );
    }
}

export default DetailsPage;