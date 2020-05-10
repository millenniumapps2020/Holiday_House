import React, { Component } from 'react'
import { POST } from '../model/ApiCommunicator';
import { ADD_REMOVE_SHORTLIST } from '../model/ServiceURLs';
import ImageGallery from 'react-image-gallery';

import './HouseCardComponentStyle.css';


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
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }
    addShortList = () => {
        let request = {
            "userId": "1",
            "propertyId": this.props.data.propertyId
        }
        POST(ADD_REMOVE_SHORTLIST, request, this.successRespCBShortListAction, this.errorRespCBShortListAction);
        var data = this.state.data;
        data.favourite = data.favourite == "1" ? "0" : "1"
        this.setState({ data: data })
    }

    successRespCBShortListAction = (response) => {
        var data = this.state.data;
        if (response.message == "Removed short List") {
            data.favourite = "0";
        } else {
            data.favourite = "1";
        }
        console.log('this.props.shortActioncallback', this.props.shortActioncallback)
        if (this.props.shortActioncallback) {
            this.props.shortActioncallback(response.message)
        }
        this.setState({ data: data })
    }

    errorRespCBShortListAction = (error) => {
        console.log('response_error', error)

    }
    booking = () => {

    }
    render() {
        var data = this.state.data;
        var activeStar = [
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
        ]
        const galleryImages = data && data.images && data.images.length > 0 ? data.images.map((item) => {
            return {
                original: item.imageUrl,
                thumbnail: item.imageUrl,
            };
        }) : [];

        return (
            !data ? <div className="house-card" >
                <div className="house-card__inner " >
                    <div className="img-container">
                    </div> :
                </div> :

                    </div> :
                <div className="house-card">
                    <div className="house-card__inner ">
                        <div className="img-container" style={this.props.name == "sliderHouseHold" ? { paddingBottom: this.props.type == "single" ? '46%' : '35.6%', width: '60%', float: 'left' } : {}}>
                            <div className="property-image-gallery" >
                                {this.props.arrow ?
                                    <div className="arrow arrow-prev"></div> : null
                                }
                                {galleryImages.length > 0 ?
                                    <ImageGallery
                                        onClick={() => this.props.onCardClick(this.props.data)}
                                        showThumbnails={false}
                                        showFullscreenButton={false}
                                        items={galleryImages}
                                        showPlayButton={false}
                                    /> :
                                    <img src={data.Image} className="image current" style={{ backgroundImage: data.Image }} onClick={() => this.props.onCardClick(this.props.data)} />
                                }
                            </div>

                            <div className="shortlist-button-wrap" onClick={this.addShortList}>
                                <i className={(data.favourite == "1" ? "red-color fas" : "far") + " fa-heart"}></i>
                            </div>
                            <div className="flag house-card-flag instant" onClick={() => this.props.onCardClick(this.props.data)}>
                                <span>Instant booking</span>
                            </div>
                            <div className="house-card__rate" onClick={() => this.props.onCardClick(this.props.data)}>
                                <small>From </small>Rs {data.amount}<small> per night</small>
                            </div>
                        </div>
                        <div className="info-container" onClick={() => this.props.onCardClick(this.props.data)} style={this.props.name == "sliderHouseHold" ? { height: 300 } : {}}>
                            <div className="house-card__location">
                                <small>{data.name}</small>
                            </div>
                            <div className="house-card__name">{data.address}</div>
                            {this.props.name == "sliderHouseHold" ?
                                <div class="house-card__description">
                                    {data.description}
                                </div> : null}
                            <div className="flex-align">
                                <div className="house-card__rating">
                                    <div className="rating-star">
                                        <div>
                                            {data.rating != undefined && (activeStar[(+data.rating)]).map(item => {
                                                return (<div className={"rating-star__img d-inline-flex " + (item == 1 ? "filled" : "empty")}></div>);
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ul className="house-card__specs">
                                        <li><div className="house-card__img guest"></div><span>{data.maximumGuests}</span></li>
                                        <li><div className="house-card__img bed"></div><span>{data.bedRooms}</span></li>
                                        <li><div className="house-card__img bath"></div><span>{data.bathRooms}</span></li>
                                    </ul>
                                </div>
                            </div>
                            {this.props.name == "sliderHouseHold" ?
                                <button class="btn btn-block btn-primary cardView-button" onClick={() => this.booking()}>Instant Book</button>
                                : null}
                        </div>
                    </div>
                </div >
        )
    }
}

export default HouseCardComponent;