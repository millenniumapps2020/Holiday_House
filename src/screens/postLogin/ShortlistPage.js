import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCard from '../../components/HouseCardComponent'

import { storeShortListedHouseList } from '../../state/actions/actions'

class ShortlistPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shortListedHouses: [{}, {}, {}, {}, {}, {}]
        }
    }

    componentDidMount() {
        this.props.storeShortListedHouseList(this.state.shortListedHouses.length)
    }

    render() {
        return (
            <div id="shortList-page" className="shortList-page">
                <Header />

                <div className="shortList-container container">
                    <div class="row header">
                        <div class="col">
                            <h1>Shortlist</h1>
                            <h4>Houses you've liked</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>
                        <div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <HouseCard />
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        storeShortListedHouseList: (data) => { dispatch(storeShortListedHouseList(data)) }
    };
};

export default connect(null, mapDispatchToProps)(ShortlistPage);