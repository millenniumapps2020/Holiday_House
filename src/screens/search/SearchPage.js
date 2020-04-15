import React, { Component } from 'react'

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCard from '../../components/HouseCardComponent'
import MapComponent from '../../components/MapComponent'
import { PROPERTY } from '../../model/ServiceURLs'
import { POST } from '../../model/ApiCommunicator'
import { SCREENS } from '../../common/Constants'

class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOptions: [
                "Featured first", "lowest price", "Highest price",
                "Lowest no. bedrooms", "Highest no. bedrooms"
            ],
            selectedSlideMenu: "map",
            searchList: [{}, {}, {}, {}, {}, {}, {}, {}]
        }
    }
    componentWillMount() {
        this.fetchSearchList()
    }
    fetchSearchList() {
        console.log('this.props.location', this.props.location)
        var { location, checkIndate, checkOutdate, guest_details } = this.props.location.state.passvalue;

        var request = {
            "userId": "",
            "search": location,
            "sortBy": "",
            "fromDate": checkIndate,
            "toDate": checkOutdate,
            "adults": guest_details.adults,
            "children": guest_details.children,
            "pets": guest_details.isPets,
            "latitude": "",
            "longitude": "",
            "minPrice": "",
            "maxPrice": "",
            "payment": "",
            "minBed": "",
            "basics": "",
            "limit": "10",
            "offset": "0"
        };
        POST(PROPERTY, request, this.successRespCBProperty, this.errorRespCBProperty);
    }
    successRespCBProperty = (res) => {
        this.setState({ searchList: res.result })
    }
    errorRespCBProperty = (error) => {
        console.log('errorRespCBProperty', error)
    }
    onClickSlideMenu = (menu) => {
        this.setState({ selectedSlideMenu: menu })
    }

    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    render() {
        const { sortOptions, selectedSlideMenu, searchList } = this.state;
        console.log('selectedSlideMenu ', selectedSlideMenu)

        return (
            <div>
                <Header key="searchHeader" showSearch={true}
                    onClickSlideMenuCB={this.onClickSlideMenu}
                />
                {selectedSlideMenu != "map" ?
                    <div className="search-base">
                        <div className={"col"}>
                            <div className="search-header">
                                <div className="left flex-align-center">
                                    <span>Sort :</span>
                                    <select className="sort-select">
                                        {sortOptions.map((item, index) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="right flex-align-center">
                                    Showing <span style={{ marginLeft: 5, fontWeight: "bold", marginRight: 5, }}>1-24</span> of <span style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}> 71 </span> results
                                </div>
                            </div>

                            <div className="row result-content">
                                {
                                    searchList.length ?
                                        searchList.map((item, index) => {
                                            return (
                                                <div style={{ padding: 0 }} id="house-card-0"
                                                    className={`${selectedSlideMenu === "map" ?
                                                        'col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'
                                                        :
                                                        'col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3'}`}>
                                                    <HouseCard data={item} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                                                </div>
                                            )
                                        })
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null}
                {selectedSlideMenu == "map" ?
                    <div className="search-map-base col-12 col">
                        <MapComponent maplist={searchList} />
                    </div>
                    : null
                }
                <Footer />
            </div >
        )
    }
}

export default SearchPage;