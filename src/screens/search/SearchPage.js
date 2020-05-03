import React, { Component } from 'react'

import HeaderComponent from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCardComponent from '../../components/HouseCardComponent'
import MapComponent from '../../components/MapComponent'
import { PROPERTY } from '../../model/ServiceURLs'
import { POST } from '../../model/ApiCommunicator'
import { SCREENS } from '../../common/Constants'
import './SearchStyle.css';
import images from '../../assets/images'
import LoaderComponent from '../../components/LoaderComponent'

class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOptions: [
                "Featured first", "lowest price", "Highest price",
                "Lowest no. bedrooms", "Highest no. bedrooms"
            ],
            sortOptionsIndex: 0,
            selectedSlideMenu: "map",
            searchList: [],
            offset: 0,
            request: {
                "offset": 0,
                "limit": 24
            }
        }
    }
    componentWillMount() {
        this.fetchSearchList()
    }
    fetchSearchList = () => {
        this.setState({ loader: true });
        if (this.props.location.state != null && this.props.location.state.passvalue != null) {
            var { location, checkIndate, checkOutdate, guest_details } = this.props.location.state.passvalue;

            var request = {
                "userId": "1",
                "search": location ?? '',
                "sortBy": "",
                "fromDate": checkIndate ?? '',
                "toDate": checkOutdate ?? '',
                "adults": guest_details?.adults ?? '',
                "children": guest_details?.children ?? '',
                "pets": guest_details?.isPets ?? '',
                "latitude": "",
                "longitude": "",
                "minPrice": "",
                "maxPrice": "",
                "payment": "",
                "minBed": '',
                "basics": '',
                "instantBooking": "",
                "limit": "24",
                "offset": "0"
            };
            this.propertyFetch(request);
        }

    }
    successRespCBProperty = (res) => {
        console.log('successRespCBProperty')
        this.setState({ loader: false, searchList: res.result, totalCount: res.extra_response.count })
    }
    errorRespCBProperty = (error) => {
        this.setState({ loader: false })
        console.log('errorRespCBProperty', error)
    }
    onClickSlideMenu = (menu) => {
        this.setState({ selectedSlideMenu: menu })
    }

    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    sortingSearch = () => {
        var { request, sortOptionsIndex, sortOptions } = this.state;
        request["sortBy"] = sortOptions[sortOptionsIndex];
        this.propertyFetch(request);
    }
    propertyFetch = (request) => {
        this.setState({ request: request, loader: true });
        POST(PROPERTY, request, this.successRespCBProperty, this.errorRespCBProperty);
    }
    searchCallback = (data) => {

        var { location, checkIndate, checkOutdate, guest_details, payment, price, filterDetails, } = data;
        var { sortOptionsIndex, sortOptions } = this.state;
        var request = {
            "userId": "1",
            "search": location ?? '',
            "sortBy": sortOptions[sortOptionsIndex],
            "fromDate": checkIndate ?? '',
            "toDate": checkOutdate ?? '',
            "adults": guest_details?.adults ?? '',
            "children": guest_details?.children ?? '',
            "pets": guest_details?.isPets ?? '',
            "latitude": "",
            "longitude": "",
            "minPrice": price?.lowerPrice ?? '',
            "maxPrice": price?.lowerPrice ?? '',
            "payment": payment ?? '',
            "minBed": filterDetails?.bedroom ?? '',
            "basics": filterDetails?.basics ?? '',
            "instantBooking": "",
            "limit": "24",
            "offset": "0"
        };
        this.propertyFetch(request);
    }
    pageNavigation = (type) => {
        var { request } = this.state;
        if (type == "prev") {
            request["offset"] = (+request["offset"]) - 24;
        } else {
            request["offset"] = (+request["offset"]) + 24;
        }
        this.propertyFetch(request);
    }
    render() {
        const { sortOptions, selectedSlideMenu, request, loader, totalCount, searchList, sortOptionsIndex } = this.state;
        var starting = (+request.offset) + 1;
        var endPage = ((+request.offset) + searchList.length);
        var pageOffset = starting + ' - ' + endPage;
        var count = (+request.offset) / 24;
        return (
            <div className="search-page-wrap">
                <div className="search-top-header">
                    <HeaderComponent key="searchHeader" name="searchHeader"
                        showSearch={true}
                        onClickSlideMenuCB={this.onClickSlideMenu}
                        searchCallback={this.searchCallback}
                    />
                    {loader ?
                        <div className="loader-search-wrap">
                            <LoaderComponent height={'calc(100vh - 210px)'} />
                        </div>
                        : null}
                </div>

                {searchList.length > 0 ?
                    <div className="search-body row">
                        <div className={("search-base " + (selectedSlideMenu != "map" ? "col-12" : "col-6"))}>
                            <div className={"col"}>
                                <div className="search-header">
                                    <div className="left flex-align-center">
                                        <span>Sort :</span>
                                        <select className="sort-select"
                                            onChange={(e) => this.setState({ sortOptionsIndex: sortOptions.indexOf(e.target.value) }, () => {
                                                console.log('e.target.value', this.state.sortOptionsIndex)
                                                this.sortingSearch();
                                            })}
                                        >
                                            {sortOptions.map((item, index) => {
                                                return (
                                                    <option value={item} selected={sortOptionsIndex == index}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="right flex-align-center d-none d-md-block ">
                                        Showing <span style={{ marginLeft: 5, fontWeight: "bold", marginRight: 5 }}>{pageOffset}</span> of <span style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}> {totalCount} </span> results
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
                                                            'col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'}`}>
                                                        <HouseCardComponent key="searchComponent" data={item} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                                                    </div>
                                                )
                                            })
                                            : null
                                    }
                                </div>
                                <div className="col col-12 pagination-wrap">
                                    <div className="text-center">
                                        Showing <span style={{ marginLeft: 5, fontWeight: "bold", marginRight: 5 }}>{pageOffset}</span> of <span style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}> {totalCount} </span> results
                                        </div>
                                    <div className="pagination-wrap-button row flex-align-center justify-content-center">
                                        <div className={"btn btn-pagination " + (starting == 1 ? "btn-disabled" : "")} onClick={() => (starting == 1) ? null : this.pageNavigation('prev')}>
                                            Prev
                                            </div>
                                        <p> Page {count + 1}</p>
                                        <div className={"btn btn-pagination " + (endPage >= totalCount ? "btn-disabled" : "")} onClick={() => (endPage >= totalCount) ? null : this.pageNavigation('next')}>
                                            Next
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedSlideMenu == "map" ?
                            <div className="search-map-base col-6">
                                <MapComponent maplist={searchList} />
                            </div>
                            : null
                        }
                    </div> : loader ? null : <div className="empty-searchlist-wrap">
                        <div className="col empty-searchlist">
                            <img src={images.common.no_houses_image} className="icon-symbol" />
                            <h5 className="heading">Sorry</h5>
                            <h5 > There are currently no NZStays matching your criteria.</h5>
                            <p>Refine your search to see other options. </p>
                            <button class=".btn.btn-primary search-button" onClick={this.fetchSearchList}>
                                Clear filters
                    </button>
                        </div>
                    </div>
                }




            </div >
        )
    }
}

export default SearchPage;