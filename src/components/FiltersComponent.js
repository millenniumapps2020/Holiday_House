import React, { Component } from 'react';
import './FiltersComponentStyle.css';

class FiltersComponent extends Component {
    state = {
        modalVisible: false,
        basicsRadioButton: {
            "Linen supplied": false,
            "Spa pool": false,
            "BBQ": false,
            "Wifi": false,
            "Smoking permitted": false,
            "Disabled access": false,
            "Cellphone coverage": false,
            "Swimming pool": false,
            "Sky TV": false,
        },
        bedroom: 1,
        keywords: '',
        count: 0
    }

    filterModalToggle = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }
    changeBedroom(key, type) {
        var value = this.state[key];
        if (type == "minus") {
            if (value !== 1) {
                this.setState({ [key]: value - 1 })
            }
        } else {
            this.setState({ [key]: value + 1 })
        }
    }
    clear = () => {
        this.setState({
            basicsRadioButton: {
                "Linen supplied": false,
                "Spa pool": false,
                "BBQ": false,
                "Wifi": false,
                "Smoking permitted": false,
                "Disabled access": false,
                "Cellphone coverage": false,
                "Swimming pool": false,
                "Sky TV": false,
            },
            bedroom: 1,
            keywords: '',
            count: 0
        })
        var data = {
            basics: '',
            bedroom: 1,
        }
        this.props.onCallBack(data);
    }
    apply = () => {
        var { basicsRadioButton, bedroom, keywords } = this.state;
        var basics = [];
        Object.values(basicsRadioButton).map((item, index) => {
            if (item) {
                basics.push(Object.keys(basicsRadioButton)[index])
            }
            return item;
        });
        var data = {
            basics: basics.join() + (keywords ? (',' + keywords) : ''),
            bedroom,
        }
        var count = (Object.values(basicsRadioButton).includes(true) ? 1 : 0) + (+bedroom > 1 ? 1 : 0) + (keywords.length > 0 ? 1 : 0);
        this.setState({ count, modalVisible: false })
        this.props.onCallBack(data);
    }
    render() {
        var { modalVisible, basicsRadioButton, bedroom, keywords, count } = this.state;
        return (
            <div className="col input-controller filter-controller">
                <div className={"btn btn-basic" + (count ? " selected-search-btn" : "")} onClick={this.filterModalToggle}>Filters
                    {count ? <span className="filter-count">{count}</span> : null}
                </div>
                <div className="modal modal-login show fade" id="myModal" role="dialog" style={{ display: modalVisible ? "block" : "none" }}>
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <button className="close-btn" onClick={this.filterModalToggle}>×</button>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="modal-title">Filters</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="bedroom">
                                            <div class="input-group">
                                                <div className="flex-align">
                                                    <label className="label">
                                                        Minimum Bedrooms
                                                    </label>
                                                </div>
                                                <div class="input-group-prepend">
                                                    <button id="" class="btn btn-action btn-number" onClick={() => this.changeBedroom('bedroom', 'minus')}> - </button>
                                                </div>
                                                <input type="text" value={bedroom} name="adults" class="form-control text-center" />
                                                <div class="input-group-append">
                                                    <button id="searchUpAdultsBtn" class="btn btn-action btn-number" onClick={() => this.changeBedroom('bedroom', 'plus')}> + </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row basics">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5 className="title">Basics</h5>
                                            </div>
                                            {Object.keys(basicsRadioButton).map((item, index) => {
                                                return (
                                                    <div className="col-12 col-sm-6 radio-button">
                                                        <input
                                                            type="checkbox"
                                                            class="form-check-input"
                                                            checked={Object.values(basicsRadioButton)[index]}
                                                            onChange={(event) => {
                                                                basicsRadioButton[item] = event.target.checked;
                                                                this.setState({
                                                                    basicsRadioButton
                                                                })
                                                            }}
                                                        />
                                                        <label>
                                                            {item}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="row keywords">
                                    <div className="col">
                                        <h5 className="title">Keywords</h5>
                                        <input
                                            placeholder="Beach, Romantic, Peaceful etc"
                                            className="form-control"
                                            value={keywords}
                                            onChange={(e) => {
                                                this.setState({ keywords: e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div class="row ">
                                    <div class="col filter-buttons" >
                                        <button class="btn btn-link" onClick={this.clear}>Clear</button>
                                        <button class="btn btn-primary primry-button" onClick={this.apply}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div >
            </div >
        );
    }
}
export default FiltersComponent;