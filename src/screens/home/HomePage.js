import React, { Component } from 'react';
import images from '../../assets/images'
import './css/HomeStyle.css';

class HomePage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="banner-wrap" style={{ backgroundImage: `url(${images.common.banner_three})` }}>
                        <div className="banner-cover">
                            <div className="search-container">
                                <h1 className="banner-title">For better places to&nbsp;stay</h1>
                                <div className="row search-box">
                                    <div className="col input-controller location-controller">
                                        <input
                                            type="text"
                                            value=""
                                            className="search-icon form-control"
                                            placeholder="Where would you like to go?"
                                        />
                                    </div>
                                    <div className="col input-controller date-controller">
                                        <input
                                            type="text"
                                            value=""
                                            className="search-icon start-date form-control"
                                            placeholder="Check in"
                                        />
                                        <input
                                            type="text"
                                            value=""
                                            className="end-date form-control"
                                            placeholder="Check out"
                                        />
                                    </div>
                                    <div className="col input-controller location-controller">
                                        <input
                                            type="text"
                                            value=""
                                            className="search-icon form-control"
                                            placeholder="Guests"
                                        />
                                    </div>
                                    <div className="col-auto input-controller">
                                        <button type="submit" id="submitSearchBtn" class="search-button btn btn-primary btn-block">
                                            {/* <span class="d-sm-none fas fa-search"></span> */}
                                            <span class="d-none d-sm-inline">Search</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;