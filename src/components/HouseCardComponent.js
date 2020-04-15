import React, { Component } from 'react'
import { POST } from '../model/ApiCommunicator';
import { ADD_REMOVE_SHORTLIST } from '../model/ServiceURLs';

class HouseCardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }
    componentWillMount() {
        this.setState({ data: this.props.data })
    }
    addShortList = () => {
        let request = {
            "userId": "1",
            "propertyId": this.props.data.propertyId
        }
        POST(ADD_REMOVE_SHORTLIST, request, this.successRespCBShortListAction, this.errorRespCBShortListAction);
    }

    successRespCBShortListAction = (response) => {
        var data = this.state.data;
        if (response.message == "Removed short List") {
            data.status = "0";
        } else {
            data.status = "1";
        }
        this.setState({ data: data })
    }

    errorRespCBShortListAction = (error) => {
        console.log('response_error', error)

    }

    render() {
        var data = this.state.data;
        console.log('render_data', data)
        return (
            !data ? <div className="house-card " >
                <div className="house-card__inner ">
                    <div className="img-container">
                    </div> :
                </div> :

                    </div> :
                <div className="house-card " >
                    <div className="house-card__inner ">
                        <div className="img-container">
                            <div className="simple-image-gallery" onClick={() => this.props.onCardClick(this.props.data)}>
                                <div className="arrow arrow-prev"></div>
                                <img src={data.Image} className="image current" style={{ backgroundImage: data.Image }}>
                                </img>
                                <div className="image previous"></div>
                                <div className="arrow arrow-next"></div>
                            </div>
                            <div className="shortlist-button-wrap" onClick={this.addShortList}>
                                <i className={(data.status == "1" ? "red-color fas" : "far") + " fa-heart"}></i>
                            </div>
                            <div className="flag house-card-flag instant" onClick={() => this.props.onCardClick(this.props.data)}>
                                <span>Instant booking</span>
                            </div>
                            <div className="house-card__rate" onClick={() => this.props.onCardClick(this.props.data)}>
                                <small>From </small>Rs {data.amount}<small> per night</small>
                            </div>
                        </div>
                        <div className="info-container" onClick={() => this.props.onCardClick(this.props.data)}>
                            <div className="house-card__location">
                                <small>{data.name}</small>
                            </div>
                            <div className="house-card__name">{data.address}</div>
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
                                        <li><div className="house-card__img guest"></div><span>{data.maximumGuests}</span></li>
                                        <li><div className="house-card__img bed"></div><span>{data.bedRooms}</span></li>
                                        <li><div className="house-card__img bath"></div><span>{data.bathRooms}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
        )
    }
}

export default HouseCardComponent;