import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCard from '../../components/HouseCardComponent'

import { storeShortListedHouseList } from '../../state/actions/actions'
import { SHORTLIST } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';

class ShortlistPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shortlist: []
        }
    }

    componentDidMount() {

        this.getShortList();
    }

    getShortList = () => {
        let request = {
            "userId": "1",
            "limit": "10",
            "offset": "0"
        }
        POST(SHORTLIST, request, this.successRespCBShortListAction, this.errorRespCBShortListAction);
    }
    successRespCBShortListAction = (response) => {
        console.log('response', response)
        if (response.result.length > 0) {
            this.props.storeShortListedHouseList(response.result.length)
            this.setState({ shortlist: response.result })
        }
    }

    errorRespCBShortListAction = (error) => {
        console.log('response_error', error)

    }
    onCardClick() {

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
                        {this.state.shortlist.map((item) => {
                            return (<div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                <HouseCard data={item} onCardClick={(item) => this.onCardClick(item)} />
                            </div>)
                        })

                        }

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