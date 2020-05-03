import React, { Component } from 'react'
import images from '../assets/images';

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
                                        <img className="footer-logo1"
                                            src={images.icons.nz_logo}
                                            className="logo"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6  foot-home-logo">
                                    {/* <div>
                                        <img className="footer-logo2"
                                            src="https://www.holidayhouses.co.nz/ReactApp/images/brand/trademe.svg"
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-4 order-1 order-md-2 align-self-center">
                            <div className="row v-separator">
                                <div className="col-md-6">
                                    <ul className="unstyled-list">
                                        <li><a href="">Help</a></li>
                                        <li><a href="">Pricing</a></li>
                                        <li><a href="">Terms and Conditions</a></li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="unstyled-list">
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
                                <div>
                                    <img
                                        src="https://www.holidayhouses.co.nz/ReactApp/images/social/instagram-light.svg"
                                    />
                                </div>
                                <div>
                                    <img
                                        src="https://www.holidayhouses.co.nz/ReactApp/images/social/facebook-light.svg"
                                    />
                                </div>
                                <div>
                                    <img
                                        src="https://www.holidayhouses.co.nz/ReactApp/images/social/shield-site.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FooterComponent;
