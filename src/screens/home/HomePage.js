import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
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

var suggestionList = [{
    name: "Pet friendly",
    url: "https://www.holidayhouses.co.nz/ReactApp/images/home/pet-friendly.png",
    id: "1"
}, {
    name: "Luxury",
    url: "https://www.holidayhouses.co.nz//ReactApp/images/home/luxury.png",
    id: "2"
}, {
    name: "Rarotonga",
    url: "https://www.holidayhouses.co.nz/ReactApp/images/home/rarotonga.png",
    id: "3"
}, {
    name: "Staff picks",
    url: "https://www.holidayhouses.co.nz/ReactApp/images/home/staff-picks.png",
    id: "4"
}
]


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
        holidayList: [
            {
                name: "Common searches",
                url: "https://www.holidayhouses.co.nz/ReactApp/images/home/common-searches.png",
                type: [{
                    name: 'Kids'
                }, {
                    name: 'Linen available'
                }, {
                    name: 'Wifi'
                }, {
                    name: 'Pool'
                }, {
                    name: 'Spa'
                }],
                id: "1"
            },

            {
                name: "Hidden gems",
                url: "https://www.holidayhouses.co.nz/ReactApp/images/home/hidden-gems.png",
                id: "2",
                type: [{
                    name: 'Pohara'
                }, {
                    name: 'Kerikeri'
                }, {
                    name: 'Whitianga'
                }, {
                    name: 'Castlepoint'
                }, {
                    name: 'Hanmer Springs'
                }],
            },
            {
                name: "Pacific retreats",
                url: "https://www.holidayhouses.co.nz/ReactApp/images/home/pacific-retreats.png",
                id: "3",
                type: [{
                    name: 'Cook Islands'
                }, {
                    name: 'Vanuatu'
                }, {
                    name: 'Tonga'
                }, {
                    name: 'Fiji'
                }, {
                    name: 'Western Samoa'
                }],
            }
        ]
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
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
    clickEvent = () => {
        alert(1)
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
    render() {
        var { suggestionListView, suggestionListViewValue, guestDropdownView, holidayList } = this.state;

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.

        return (
            <div className="homePage">
                <HeaderComponent />
                <div className="container-fluid banner">
                    <div className="row">
                        <div className="banner-wrap" style={{ backgroundImage: `url(${images.common.banner_three})` }}>
                            <div className="banner-cover">
                                <div className="search-container">
                                    <h1 className="banner-title">For better places to&nbsp;stay</h1>
                                    <div className="row search-box">
                                        <PlacesSearchComponent name="homeSearch" />
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
                                                value={"Guests"}
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
                                                            <button class="btn btn-primary apply-button" onClick={() => this.setState({ guestDropdownView: false })}>Apply</button>
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
                            {suggestionList.map((suggestionItem) => {
                                return (
                                    <div className="suggestion-wrap col-lg-3 col-sm-6"
                                        onClick={() => this.onClickSuggestion(suggestionItem)}
                                    >
                                        <div className="suggestion" style={{ backgroundImage: `url(${suggestionItem.url})` }}>
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
                            {suggestionList.map((suggestionItem) => {
                                return (
                                    <div className="suggestion-wrap col-lg-3 col-sm-6">
                                        <HouseCard />
                                        {/* <div className="suggestion" style={{ backgroundImage: `url(${suggestionItem.url})` }}>
                                            <h5 className="suggestion-name">{suggestionItem.name}</h5>
                                        </div> */}
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
                                    <div className="holiday-wrap col-lg-4 col-sm-6">
                                        <div className="holiday" style={{ backgroundImage: `url(${holidayItem.url})` }}>
                                        </div>
                                        <h5 className="holiday-name">{holidayItem.name}</h5>
                                        <ul className="holiday-type-ul">
                                            {holidayItem.type && holidayItem.type.length > 0 ?
                                                holidayItem.type.map((typeItem) => {
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