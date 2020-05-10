import React, { Component } from 'react';
import Slider from "react-slick";
import Autosuggest from 'react-autosuggest';
import images from '../../assets/images';
import appstore from '../../assets/appstore';
import './css/HomePageStyle.css';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import HouseCardComponent from '../../components/HouseCardComponent';
import DateComponent from '../../components/DateComponent';

import { SCREENS } from '../../common/Constants'
import PlacesSearchComponent from '../../components/PlacesSearchComponent';
import { SUGGESTION, PROPERTY, PERFECTS, DISCOVER } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';
import GuestCountComponent from '../../components/GuestCountComponent';


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
        suggestions: appstore["property"],
        suggestionListView: false,
        suggestionListViewValue: '',
        guestDropdownView: false,
        date: new Date(),
        placeProperties: [],
        guestCount: '',
        suggestionList: appstore["suggestion"],
        discoverList: appstore["discover"],
        discoverName: 'Orewa',
        holidayList: appstore["perfects"],
        location: '',
        guest_details: {}
    }

    componentDidMount() {
        this.getSuggestionList();
        this.getDiscoverList();
        this.getPerfectList();
    }

    getDiscoverList = () => {
        var request = {
            "userId": "1",
            "limit": "9",
            "offset": "0"
        };
        POST(DISCOVER, request, this.successRespCBDiscover, this.errorRespCBDiscover);
    }
    successRespCBDiscover = (data) => {
        if (data.result.length > 0) {
            console.log('data.result', data)
            this.setState({ discoverList: data.result, discoverName: data.message });
        }
    }
    errorRespCBDiscover = (error) => {

    }
    onDateChange = (date) => {
        this.setState({ date });
    }

    onFocusChange = (suggestionListView) => {
        this.setState({ suggestionListView });
    }
    onTextChange = (data) => {
        this.setState({ suggestionListViewValue: data.target.value })
    }


    onClickSuggestion = (suggestionItem) => {
        var { location, checkIndate, checkOutdate, guest_details } = this.state;
        location = location != '' ? location : 'Hibiscus';
        this.props.history.push(SCREENS.SEARCH, { passvalue: { location, checkIndate, checkOutdate, guest_details } })
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


    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    searchCallBack(location) {
        console.log('location', location)
        this.setState({ location })
    }
    render() {
        var { suggestionListView, suggestionListViewValue, guestDropdownView, holidayList } = this.state;

        const settings = {
            dots: false,
            infinite: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            // prevArrow: <div><div className="arrow-carosoul">hi</div></div>,
            // nextArrow: <div><div className="arrow-carosoul"><div className="arrow-next"></div></div></div>,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                },
            ]
        };


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
                                        <PlacesSearchComponent name="homeSearch" onCallBack={(location) => this.searchCallBack(location)} />
                                        <DateComponent setDate={(date, key) => { this.setState({ [key]: date }) }} />
                                        <GuestCountComponent initial={this.state.guest_details} onSetGuestDetails={(details) => this.setState({ guest_details: details })} />
                                        <div className="col-auto input-controller">
                                            <button type="submit" id="submitSearchBtn" class="search-button btn btn-primary btn-block" onClick={this.onClickSuggestion}>
                                                <span class="d-sm-none fas fa-search"></span>
                                                <span class="d-none d-sm-inline">Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.suggestionList.length > 0 ?
                    <div className="container-fluid suggestion-wrap">
                        <div className="suggestion-container">
                            <h1 className="suggestion-title">Suggestions</h1>
                            <div className="suggestion-list row">
                                {this.state.suggestionList.map((suggestionItem, suggestionIndex) => {
                                    return (
                                        <div className="col-6 col-sm-3" key={"suggestionKey" + suggestionIndex}
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
                    : null}
                <div className="container-fluid discover-wrap">
                    <div className="container">
                        <h1 className="suggestion-title">Discover: <a href="">{this.state.discoverName}</a></h1>
                    </div>
                    <Slider {...settings}>
                        {this.state.discoverList.map((discoverItem, index) => {
                            return (
                                <HouseCardComponent key={'discoverList' + index} data={discoverItem} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                            )
                        })}
                    </Slider>
                </div>
                {
                    this.state.holidayList.length > 0 ?
                        <div className="container-fluid holiday-wrap">
                            <div className="holiday-container">
                                <h1 className="holiday-title">Find the perfect holiday</h1>
                                <div className="holiday-list row">
                                    {this.state.holidayList.map((holidayItem) => {
                                        return (
                                            <div className="col-12 col-sm-4">
                                                <div className="holiday" style={{ backgroundImage: `url(${holidayItem.imageUrl})` }}>
                                                </div>
                                                <h5 className="holiday-name">{holidayItem.name}</h5>
                                                <ul className="holiday-type-ul">
                                                    {holidayItem.type && holidayItem.type.length > 0 ?
                                                        JSON.parse(holidayItem.search).map((typeItem) => {
                                                            return (<li className="holiday-type-list" onClick={() => {
                                                                var location = typeItem.name;
                                                                this.props.history.push(SCREENS.SEARCH, { passvalue: { location, checkIndate: '', checkOutdate: '', guest_details: '' } })
                                                            }}>{typeItem.name}</li>);
                                                        }) : null}
                                                </ul>
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
        )
    }
}

export default HomePage;