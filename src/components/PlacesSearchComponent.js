import React, { Component } from 'react';

class PlacesSearchComponent extends Component {

    state = {
        value: '',
        suggestions: [],
        suggestionListView: false,
        suggestionListViewValue: '',
        filterLocation: [],
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillReceiveProps = (nexProps) => {
        console.log('nexProps', nexProps);

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
            filterArrayList = this.props.data.filter((item) => ((item.name.toLowerCase()).includes(value.toLowerCase()) || (item.address.toLowerCase()).includes(value.toLowerCase())));
        }
        this.setState({ suggestionListViewValue: value, filterLocation: filterArrayList })
    }
    clickEvent = (data) => {
        this.setState({ suggestionListViewValue: data.name })
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
                    placeholder="Where would you like to go?"
                />
                {suggestionListView ?
                    <div className="autosuggest-wrap">
                        <div className="autosuggest-header">
                            <p>{suggestionListViewValue == '' ? "Top Locations" : "Locations"}</p>
                        </div>
                        <div className="autosuggest-list">
                            {suggestionListViewValue == '' ?
                                <div className="top-list">
                                    {this.props.data.map((propertyItem, propertyIndex) => {
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