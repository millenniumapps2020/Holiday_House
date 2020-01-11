import React, { Component } from 'react';
import images from '../../assets/images'
import './css/HomeStyle.css';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import HouseCard from '../../components/HouseCardComponent';

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
class HomePage extends Component {


    state = {
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
    render() {
        var { holidayList } = this.state;
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
                                        <div className="col input-controller location-controller">
                                            <input
                                                type="text"
                                                value=""
                                                className="search-icon form-control"
                                                placeholder="Where would you like to go?"
                                            />
                                        </div>
                                        <div className="col input-controller date-controller">
                                            <input
                                                type="text"
                                                value=""
                                                className="search-icon start-date form-control"
                                                placeholder="Check in"
                                            />
                                            <input
                                                type="text"
                                                value=""
                                                className="end-date form-control"
                                                placeholder="Check out"
                                            />
                                        </div>
                                        <div className="col input-controller location-controller">
                                            <input
                                                type="text"
                                                value=""
                                                className="search-icon form-control"
                                                placeholder="Guests"
                                            />
                                        </div>
                                        <div className="col-auto input-controller">
                                            <button type="submit" id="submitSearchBtn" class="search-button btn btn-primary btn-block">
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
                                    <div className="suggestion-wrap col-lg-3 col-sm-6">
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
            </div>
        )
    }
}

export default HomePage;