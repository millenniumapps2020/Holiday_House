import React, { Component } from 'react'
import { connect } from "react-redux";

import Header from '../../components/HeaderComponent'
import Footer from '../../components/FooterComponent'
import HouseCardComponent from '../../components/HouseCardComponent'
import LoaderComponent from '../../components/LoaderComponent'

import { storeShortListedHouseList } from '../../state/actions/actions'
import { SHORTLIST } from '../../model/ServiceURLs';
import { POST } from '../../model/ApiCommunicator';
import { SCREENS } from '../../common/Constants';
import images from '../../assets/images';
import './ShortlistStyle.css'
import AppUtils from '../../data/app_utils';

class ShortlistPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shortlist: [],
            loader: true
        }
    }

    componentDidMount() {
        this.getShortList();
    }

    getShortList = () => {
        let request = {
            "userId": AppUtils.getUserId(),
            "limit": "10",
            "offset": "0",
        }
        POST(SHORTLIST, request, this.successRespCBShortListAction, this.errorRespCBShortListAction);
    }
    successRespCBShortListAction = (response) => {
        console.log('response', response)
        if (response.result.length > 0) {
            this.props.storeShortListedHouseList(response.result.length)
            this.setState({ shortlist: response.result })
        }
        this.setState({ loader: false })
    }

    errorRespCBShortListAction = (error) => {
        this.setState({ loader: false })
        console.log('response_error', error)

    }


    dicoverCardPressed(item) {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    onClickSearchButton = () => {
        this.props.history.push(SCREENS.SEARCH, { passvalue: { location: 'Hibiscus' } });
    }

    shortcallback = (index) => {
        if (this.state.shortlist.length == 1) {
            this.setState({ shortlist: [] })
        }else{
           var shortlist= this.state.shortlist;
           shortlist.splice(index, 1);
           this.setState({shortlist})
        }
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

                    {this.state.loader ?
                        <div className="shortlist-loader-size">
                            <LoaderComponent />
                        </div> :
                        <div className="row">
                            {this.state.shortlist.map((item,index) => {
                                return (<div style={{ padding: 0 }} id="house-card-0" className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                    <HouseCardComponent data={item} shortActioncallback={this.shortcallback} index={index} onCardClick={(item) => this.dicoverCardPressed(item)} />
                                </div>)
                            })}
                            {this.state.shortlist.length == 0 ?
                                <div className="col empty-shortlist">
                                    <img src={images.common.no_houses_image} className="icon-symbol" />
                                    <h5 className="heading">Your shortlist is empty</h5>
                                    <p>
                                        You can shortlist houses by clicking the heart icon on listings cards
                                    <br />
                                    or the "Add to Shortlist" button on listings.
                                </p>
                                    <button class=".btn.btn-primary search-button" onClick={this.onClickSearchButton}>
                                        Search NZStays
                                </button>
                                </div>
                                :
                                null}
                        </div>}
                </div>

                <Footer />
            </div >
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        storeShortListedHouseList: (data) => { dispatch(storeShortListedHouseList(data)) }
    };
};

export default connect(null, mapDispatchToProps)(ShortlistPage);