import React, { Component } from 'react';
import { POST } from '../model/ApiCommunicator';
import { PROPERTY } from '../model/ServiceURLs';

class PlacesSearchComponent extends Component {

    state = {
        value: '',
        suggestions: [],
        suggestionListView: false,
        suggestionListViewValue: '',
        filterLocation: [],
        placeProperties: []
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        console.log('getProperties', this.props.name)
        if (this.props.name == "homeSearch") {
            this.getProperties('Hibiscus');
        }
    }

    componentWillReceiveProps = (nexProps) => {
        console.log('nexProps', nexProps);

    }
    getProperties = (searchValue) => {
        var request = {
            "userId": "",
            "search": searchValue,
            "sortBy": "",
            "fromDate": "",
            "toDate": "",
            "adults": "",
            "children": "",
            "pets": "",
            "latitude": "",
            "longitude": "",
            "minPrice": "",
            "maxPrice": "",
            "payment": "",
            "minBed": "",
            "basics": "",
            "limit": "10",
            "offset": "0",
            "instantBooking":''
        };
        POST(PROPERTY, request, this.successRespCBProperty, this.errorRespCBProperty);
    }
    successRespCBProperty = (data) => {
        if (data.result.length > 0) {
            this.setState({ placeProperties: data.result });
        }
    }
    errorRespCBProperty = (error) => {

    }


    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        var target = event.target;
        if (this.searchRef && !this.searchRef.contains(target)) {
            this.onFocusChange(false)
        }
    }
    onFocusChange = (suggestionListView) => {
        this.setState({ suggestionListView });
    }

    onTextChange = (data) => {
        var filterArrayList = [];
        var value = data.target.value;
        if (data.target.value != '') {
            this.getSearchProperties(data.target.value);
        }
        this.setState({ suggestionListViewValue: value, filterLocation: filterArrayList })
        this.props.onCallBack(data);
    }
    getSearchProperties = (searchValue) => {
        var request = {
            "userId": "",
            "search": searchValue,
            "sortBy": "",
            "fromDate": "",
            "toDate": "",
            "adults": "",
            "children": "",
            "pets": "",
            "latitude": "",
            "longitude": "",
            "minPrice": "",
            "maxPrice": "",
            "payment": "",
            "minBed": "",
            "basics": "",
            "limit": "10",
            "offset": "0",
            "instantBooking":''

        };
        POST(PROPERTY, request, this.successSearchRespCBProperty, this.errorRespCBProperty);
    }
    successSearchRespCBProperty = (data) => {
        if (data.result.length > 0) {
            this.setState({ filterLocation: data.result });
        }
    }
    clickEvent = (data) => {
        this.setState({ suggestionListViewValue: data.name })

        this.props.onCallBack(data.name);
        this.onFocusChange(false)
    }
    render() {
        var { suggestionListView, suggestionListViewValue } = this.state;

        return (
            <div className="col input-controller location-controller" ref={(node) => this.searchRef = node}>
                <input
                    onClick={() => this.onFocusChange(true)}
                    type="text"
                    value={suggestionListViewValue}
                    onChange={this.onTextChange}
                    className="search-icon form-control"
                    placeholder={this.props.name == "headerSearch" ? "Where are you going?" : "Where would you like to go?"}
                />
                {suggestionListView ?
                    <div className="autosuggest-wrap">
                        {this.state.placeProperties.length > 0 || this.state.filterLocation.length>0?
                            <div className="autosuggest-header">
                                <p>{suggestionListViewValue == '' ? "Top Locations" : "Locations"}</p>
                            </div> : null}
                        <div className="autosuggest-list">
                            {suggestionListViewValue == '' ?
                                <div className="top-list">
                                    {this.state.placeProperties.map((propertyItem, propertyIndex) => {
                                        return (
                                            <div className="list" onClick={() => this.clickEvent(propertyItem)}>
                                                <h6>{propertyItem.name}</h6>
                                                <p>{propertyItem.address}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <div className="search-list">
                                    {this.state.filterLocation.map((propertyItem, propertyIndex) => {
                                        return (
                                            <div className="list" onClick={() => this.clickEvent(propertyItem)}>
                                                <h6>{propertyItem.name}</h6>
                                                <p>{propertyItem.address}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default PlacesSearchComponent;