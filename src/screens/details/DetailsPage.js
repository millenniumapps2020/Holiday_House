import React, { Component } from 'react';
import images from '../../assets/images';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import './css/DetailsPageStyle.css';
import Slider from "react-slick";

import { DateRangePicker, SingleDatePicker, DateRangePickerPhrases, DateRangePickerShape, DayPickerRangeController } from 'react-dates';

import moment from 'moment';

import { PROPERTY_DETAILS, DISCOVER, ADD_REMOVE_SHORTLIST } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';
import HouseCardComponent from '../../components/HouseCardComponent';
import DateComponent from '../../components/DateComponent';
import GuestCountComponent from '../../components/GuestCountComponent';
import MapComponent from '../../components/MapComponent';
import { SCREENS } from '../../common/Constants';
import RatingStartComponent from '../../components/RatingStartComponent';
import LoaderComponent from '../../components/LoaderComponent';
import DateRangeComponent from '../../components/DateRangeComponent';
import GalleryPage from './GalleryPage';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

    class DetailsPage extends Component {
    state = {
        propertyDetails: {},
        discoverList: [],
        loader: true,
        fullAmentiesView: false,
        showGallery: false

    }
    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.getPerpertyDetails()
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
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
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
        var { propertyDetails, loader, fullAmentiesView, fullReviewView } = this.state;
        console.log('loader', loader);
        return (
            <div className="detailsPage">
            </div >
        );
    }
}

export default DetailsPage;