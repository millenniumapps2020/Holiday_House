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
            selectedSlideMenu: "map",
            searchList: [],
            offset: 0,
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
                "minBed": "",
                "basics": "",
                "limit": "10",
                "offset": this.state.offset
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
    propertyFetch = (request) => {
        POST(PROPERTY, request, this.successRespCBProperty, this.errorRespCBProperty);
    }
    searchCallback = (data) => {

        var { location, checkIndate, checkOutdate, guest_details, payment, price } = data;
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
            "minPrice": price?.lowerPrice ?? '',
            "maxPrice": price?.lowerPrice ?? '',
            "payment": payment ?? '',
            "minBed": "",
            "basics": "",
            "limit": "10",
            "offset": this.state.offset
        };
        this.propertyFetch(request);
    }
    render() {
        const { sortOptions, selectedSlideMenu, offset, loader, totalCount, searchList } = this.state;
        console.log('selectedSlideMenu ', selectedSlideMenu)
        var starting = (offset == 0 ? 1 : (((+offset) - 1) * 24) + 1);
        var endPage = (starting + searchList.length)-1;
        var pageOffset = starting + ' - ' + endPage;
        return (
            <div className="search-page-wrap">
                <div className="search-top-header">
                    <HeaderComponent key="searchHeader" name="searchHeader"
                        showSearch={true}
                        onClickSlideMenuCB={this.onClickSlideMenu}
                        searchCallback={this.searchCallback}
                    />
                </div>
                {loader ?
                    <LoaderComponent height={600} />
                    :
                    searchList.length > 0 ?
                        <div className="search-body">
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
                            <div className="pagination-wrap">
                                <div className="text-center">
                                    Showing <span style={{ marginLeft: 5, fontWeight: "bold", marginRight: 5 }}>{pageOffset}</span> of <span style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}> {totalCount} </span> results
                                </div>
                                <div className="pagination-wrap-button row flex-align-center justify-content-center">
                                    <div className={"btn btn-pagination " + (starting == 1 ? "btn-disabled" : "")}>
                                        Prev
                                    </div>
                                    <p> Page {(+offset)+1}</p>
                                    <div className={"btn btn-pagination " + (endPage == totalCount ? "btn-disabled" : "")}>
                                        Next
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="empty-searchlist-wrap">
                            <div className="col empty-searchlist">
                                <img src={images.common.no_houses_image} className="icon-symbol" />
                                <h5 className="heading">Sorry</h5>
                                <h5 > There are currently no Holiday Houses matching your criteria.</h5>
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