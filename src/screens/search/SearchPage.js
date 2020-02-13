import React, { Component } from 'react'

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCard from '../../components/HouseCardComponent'
import MapComponent from '../../components/MapComponent'

class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sortOptions: [
                "Featured first", "lowest price", "Highest price",
                "Lowest no. bedrooms", "Highest no. bedrooms"
            ],
            selectedSlideMenu: "",
            searchList: [{}, {}, {}, {}, {}, {}, {}, {}]
        }
    }

    onClickSlideMenu = (menu) => {
        this.setState({ selectedSlideMenu: menu })
    }

    render() {
        const { sortOptions, selectedSlideMenu, searchList } = this.state

        return (
            <div>
                <Header showSearch={true}
                    onClickSlideMenuCB={this.onClickSlideMenu}
                />
                <div className="search-base">
                    <div className={selectedSlideMenu === "map" ? "col-6 col" : "col"}>
                        <div className="search-header">
                            <div className="left flex-align-center">
                                <span>Sort :</span>
                                <select className="sort-select">
                                    {
                                        sortOptions.map((item, index) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })
                                    }
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
                                            < div style={{ padding: 0 }} id="house-card-0"
                                                className={`${selectedSlideMenu === "map" ?
                                                    'col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'
                                                    :
                                                    'col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3'}`}>
                                                <HouseCard />
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    </div>
                    {
                        selectedSlideMenu === "map" ?
                            <div className="col-6 col">
                                <MapComponent />
                            </div>
                            : null
                    }

                </div>
                <Footer />
            </div >
        )
    }
}

export default SearchPage;