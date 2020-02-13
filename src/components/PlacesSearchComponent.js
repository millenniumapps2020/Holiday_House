import React, { Component } from 'react';

class PlacesSearchComponent extends Component {

    state = {
        value: '',
        suggestions: [],
        suggestionListView: false,
        suggestionListViewValue: '',
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

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
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
        this.setState({ suggestionListViewValue: data.target.value })
    }
    clickEvent = () => {
        this.setState({ suggestionListViewValue: 'Queenstown/wanaka' })
        this.onFocusChange(false)
    }
    render() {
        var { suggestionListView, suggestionListViewValue, guestDropdownView, holidayList } = this.state;

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
                                <div className="top-list" onClick={this.clickEvent}>
                                    <div className="list">
                                        <h6>Queenstown</h6>
                                        <p>Queenstown/wanaka</p>
                                    </div>

                                    <div className="list">
                                        <h6>Queenstown</h6>
                                        <p>Queenstown/wanaka</p>
                                    </div>
                                </div>
                                :
                                <div className="search-list">
                                    <div className="list">
                                        <h6>Queenstown</h6>
                                        <p>Queenstown/wanaka</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default PlacesSearchComponent;