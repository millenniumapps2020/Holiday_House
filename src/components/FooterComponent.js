import React, { Component } from 'react'

class FooterComponent extends Component {
    render() {
        return (
            <div className="footer-base">
                <div className="footer-container">
                    <div className="row footer-container-inner">
                        <div className="col-md-4 col-lg-6 order-2 order-md-1 align-self-center">
                            <div className="row">
                                <div className="col-lg-6 foot-home-logo">
                                    <div>
                                        holiday house
                                    </div>
                                </div>
                                <div className="col-lg-6  foot-home-logo">
                                    <div>
                                        trademe
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4 order-1 order-md-2 align-self-center">
                            <div className="row v-separator">
                                <div className="col-md-6">
                                    <ul class="unstyled-list">
                                        <li><a href="">Help</a></li>
                                        <li><a href="">Pricing</a></li>
                                        <li><a href="">Terms and Conditions</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul class="unstyled-list">
                                        <li><a href="">Privacy Policy</a></li>
                                        <li><a href="">Site Map</a></li>
                                        <li><a href="">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-3 col-lg-2 order-3 order-md-3 align-self-center">
                            <div className="row justify-content-center social-media">
                                <div>Insta</div>
                                <div>FB</div>
                                <div>WEB</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterComponent;
