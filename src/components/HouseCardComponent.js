import React, { Component } from 'react'

class HouseCardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="house-card ">
                <div className="house-card__inner ">
                    <div className="img-container">
                        <div className="simple-image-gallery">
                            <div className="arrow arrow-prev"></div>
                            <div className="image current"
                                style={{ backgroundImage: 'url("https://holidayhouses.tmcdn.co.nz/hh/full/48/864848.jpg")' }}
                            >
                            </div>
                            <div className="image next"
                                style={{ backgroundImage: 'url("https://holidayhouses.tmcdn.co.nz/hh/full/87/2647587.jpg")' }}
                            >
                            </div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image"></div>
                            <div className="image previous"></div>
                            <div className="arrow arrow-next"></div>
                        </div>
                        <div className="house-card__shortlist">
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="flag house-card-flag instant">
                            <span>Instant booking</span>
                        </div>
                        <div className="house-card__rate">
                            <small>From </small>Rs 1300<small> per night</small>
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="house-card__location">
                            <small>Mt Maunganui</small>
                        </div>
                        <div className="house-card__name">Oceanside Twin Towers  Beachside Apartment</div>
                        <div className="flex-align">
                            <div className="house-card__rating">
                                <div className="rating-star">
                                    <div>
                                        <div className="rating-star__img filled d-inline-flex"></div>
                                        <div className="rating-star__img filled d-inline-flex"></div>
                                        <div className="rating-star__img filled d-inline-flex"></div>
                                        <div className="rating-star__img filled d-inline-flex"></div>
                                        <div className="rating-star__img empty d-inline-flex"></div>
                                    </div></div></div>
                            <div>
                                <ul className="house-card__specs">
                                    <li><div className="house-card__img guest"></div><span>6</span></li>
                                    <li><div className="house-card__img bed"></div><span>3</span></li>
                                    <li><div className="house-card__img bath"></div><span>2</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HouseCardComponent;