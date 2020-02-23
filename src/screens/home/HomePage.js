import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import images from '../../assets/images'
import './css/HomePageStyle.css';
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

class HomePage extends Component {


    state = {
        focused: false,
        date: null,
        value: '',
        suggestions: [],
        suggestionListView: false,
        suggestionListViewValue: '',
        guestDropdownView: false,
        date: new Date(),
        children: 1,
        adults: 1,
        placeProperties: [],
        guestCount: '',
        suggestionList: [],
        discoverList: [],
        holidayList: []
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.getProperties();
        this.getSuggestionList();
        this.getDiscoverList();
        this.getPerfectList();
    }
    getProperties = () => {
        var request = {
            "userId": "",
            "limit": "10",
            "offset": "6"
        };
        POST(PROPERTY, request, this.successRespCBProperty, this.errorRespCBProperty);
    }
    successRespCBProperty = (data) => {
        console.log('data', data);
        if (data.result.length > 0) {
            this.setState({ placeProperties: data.result });
        }
    }
    errorRespCBProperty = (error) => {

    }
    getDiscoverList = () => {
        var request = {
            "userId": "",
            "limit": "10",
            "offset": "6"
        };
        POST(PROPERTY, request, this.successRespCBDiscover, this.errorRespDiscover);
    }
    successRespCBDiscover = (data) => {
        if (data.result.length > 0) {
            console.log('data.result', data.result)
            this.setState({ discoverList: data.result });
        }
    }
    errorRespCBDiscover = (error) => {

    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
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
    onDateChange = (date) => {
        this.setState({ date });
    }

    onFocusChange = (suggestionListView) => {
        this.setState({ suggestionListView });
    }
    onGuestChange = (guestDropdownView) => {
        this.setState({ guestDropdownView })
    }

    onTextChange = (data) => {
        this.setState({ suggestionListViewValue: data.target.value })
    }


    onClickSuggestion = (suggestionItem) => {
        this.props.history.push(SCREENS.SEARCH)
    }
    changeGuest(key, type) {
        var value = this.state[key];
        if (type == "minus") {
            if (value !== 0) {
                this.setState({ [key]: value - 1 })
            }
        } else {
            this.setState({ [key]: value + 1 })
        }
    }
    getSuggestionList() {
        let request = {
            "userId": "",
            "limit": "4",
            "offset": "0"
        };
        POST(SUGGESTION, request, this.successRespCBSuggestion, this.errorRespCBSuggestion);
    }

    successRespCBSuggestion = (response) => {
        console.log('response', response)
        if (response.result.length > 0) {
            this.setState({ suggestionList: response.result });
        }

    }

    errorRespCBSuggestion = (error) => {
        console.log('error.message', error)
    }

    getPerfectList() {
        let request = {
            "userId": "1",
            "limit": "3",
            "offset": "0"
        };
        POST(PERFECTS, request, this.successRespCBPerfectList, this.errorRespCBPerfectList);
    }

    successRespCBPerfectList = (response) => {
        console.log('response', response)
        if (response.result.length > 0) {
            this.setState({ holidayList: response.result });
        }

    }

    errorRespCBPerfectList = (error) => {
        console.log('error.message', error)
    }

    addGeustDetails() {
        var count = (this.state.adults + this.state.children)
        this.setState({ guestDropdownView: false, guestCount: count > 0 ? count : '' })
    }
    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: 1 })
    }
    render() {
        var { suggestionListView, suggestionListViewValue, guestDropdownView, holidayList } = this.state;

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.

        return (
            <div className="homePage">
                <HeaderComponent key="homeHeader" />
                <div className="container-fluid banner">
                    <div className="row">
                        <div className="banner-wrap" style={{ backgroundImage: `url(${images.common.banner_three})` }}>
                            <div className="banner-cover">
                                <div className="search-container">
                                    <h1 className="banner-title">For better places to&nbsp;stay</h1>
                                    <div className="row search-box">
                                        <PlacesSearchComponent name="homeSearch" data={this.state.placeProperties} />
                                        <div className="col input-controller date-controller">
                                            <div ref={(node) => this.checkIndateRef = node}>
                                                <input
                                                    onClick={() => this.setState({ checkIndateVisible: true })}
                                                    type="text"
                                                    value={this.state.checkIndate}
                                                    className="guestInput calendar-icon start-date form-control"
                                                    placeholder="Check in"
                                                />
                                                {this.state.checkIndateVisible ?
                                                    <div style={{ position: 'absolute', zIndex: 10000 }}>
                                                        <Calendar
                                                            minDate={new Date()}
                                                            onChange={(date) => this.setState({ checkIndate: moment(date).format('DD/MM/YYYY') })}
                                                            value={this.state.date}
                                                        />
                                                    </div> : null}
                                            </div>
                                            <div ref={(node) => this.checkOutdateRef = node}>
                                                <input
                                                    onClick={() => this.setState({ checkOutdateVisible: true })}
                                                    type="text"
                                                    value={this.state.checkOutdate}
                                                    className="guestInput end-date form-control"
                                                    placeholder="Check out"
                                                />
                                                {this.state.checkOutdateVisible ?
                                                    <div style={{ position: 'absolute', zIndex: 10000 }}>
                                                        <Calendar
                                                            minDate={new Date()}
                                                            onChange={(date) => this.setState({ checkOutdate: moment(date).format('DD/MM/YYYY') })}
                                                            value={this.state.date}
                                                        />
                                                    </div>

                                                    : null}
                                            </div>
                                        </div>
                                        <div className="col input-controller location-controller" ref={(node) => this.guestRef = node}>
                                            <input
                                                onFocus={() => this.onGuestChange(true)}
                                                value={this.state.guestCount}
                                                className="guestInput guest-icon form-control"
                                                placeholder="Guests"
                                            />
                                            {guestDropdownView ?
                                                <div className="guest-drowndown-wrap">
                                                    <div className="guest-wrap">
                                                        <h6>Adults</h6>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <button id="" class="btn btn-action btn-number" onClick={() => this.changeGuest('adults', 'minus')}> - </button>
                                                            </div>
                                                            <input type="text" name="adults" class="form-control text-center" value={this.state.adults} />
                                                            <div class="input-group-append">
                                                                <button id="searchUpAdultsBtn" class="btn btn-action btn-number" onClick={() => this.changeGuest('adults', 'plus')} > + </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="guest-wrap">
                                                        <div className="row-spaceBetween">
                                                            <h6>children</h6>
                                                            <p>ages 3 to 16</p>
                                                        </div>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <button id="" class="btn btn-action btn-number" onClick={() => this.changeGuest('children', 'minus')}> - </button>
                                                            </div>
                                                            <input type="text" value={this.state.children} name="adults" class="form-control text-center" />
                                                            <div class="input-group-append">
                                                                <button id="searchUpAdultsBtn" class="btn btn-action btn-number" onClick={() => this.changeGuest('children', 'plus')}> + </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="guest-wrap">
                                                        <div className="row-spaceBetween">
                                                            <div class="position-relative form-check">
                                                                <label class="form-check-label">
                                                                    <input type="checkbox" class="form-check-input" />
                                                                    <span>Pets</span>
                                                                </label>
                                                            </div>
                                                            <button class="btn btn-primary apply-button" onClick={() => this.addGeustDetails()}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div> : null}
                                        </div>
                                        <div className="col-auto input-controller">
                                            <button type="submit" id="submitSearchBtn" class="search-button btn btn-primary btn-block" onClick={this.onClickSuggestion}>
                                                {/* <span class="d-sm-none fas fa-search"></span> */}
                                                <span class="d-none d-sm-inline">Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container suggestion-wrap">
                    <div className="suggestion-container">
                        <h1 className="suggestion-title">Suggestions</h1>
                        <div className="suggestion-list row">
                            {this.state.suggestionList.map((suggestionItem, suggestionIndex) => {
                                return (
                                    <div className="col-lg-3 col-sm-6" key={"suggestionKey" + suggestionIndex}
                                        onClick={() => this.onClickSuggestion(suggestionItem)}
                                    >
                                        <div className="suggestion" style={{ backgroundImage: `url(${suggestionItem.imageUrl})` }}>
                                            <h5 className="suggestion-name">{suggestionItem.name}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="container-fluid discover-wrap">
                    <div className="row">
                        <div className="container">
                            <h1 className="suggestion-title">Discover:<a href="">Titikaveka</a></h1>
                        </div>
                        <div className="discover-list-wrap">
                            {this.state.discoverList.map((discoverItem) => {
                                return (
                                    <div className="col-lg-3 col-sm-6" >
                                        <HouseCard data={discoverItem} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="container holiday-wrap">
                    <div className="holiday-container">
                        <h1 className="holiday-title">Find the perfect holiday</h1>
                        <div className="holiday-list row">
                            {holidayList.map((holidayItem) => {
                                return (
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="holiday" style={{ backgroundImage: `url(${holidayItem.imageUrl})` }}>
                                        </div>
                                        <h5 className="holiday-name">{holidayItem.name}</h5>
                                        <ul className="holiday-type-ul">
                                            {holidayItem.type && holidayItem.type.length > 0 ?
                                                JSON.parse(holidayItem.search).map((typeItem) => {
                                                    return (<li className="holiday-type-list">{typeItem.name}</li>);
                                                }) : null}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div >
        )
    }
}

export default HomePage;