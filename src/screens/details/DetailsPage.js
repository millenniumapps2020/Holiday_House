import React, { Component } from 'react';
import images from '../../assets/images';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import './css/DetailsPageStyle.css';

import Slider from "react-slick";

class DetailsPage extends Component {
    sliderItem = [{
        "images": "https://www.itl.cat/pngfile/big/0-7755_nature-pier-bridge-d-river-water-sunset-night.jpg"
    }, {
        "images": "https://cdn.pizap.com/pizapfiles/images/photo_backgrounds_textures_app05.jpg"
    }, {
        "images": "https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Circle-Simple-Background-Image-1.jpg"
    }, {
        "images": "https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458__340.jpg"
    }, {
        "images": "https://i.pinimg.com/originals/97/de/31/97de318f2fcfc94a4a9ee231ca611db3.jpg"
    }, {
        "images": "https://www.howtogeek.com/wp-content/uploads/2018/05/9santamonica.jpg"
    }, {
        "images": "https://spacehold.it/1600x900/1.jpg"
    }, {
        "images": "https://www.elsetge.cat/myimg/f/0-7622_computer-background-cool-desktop-landscape-lake-desktops-computer.jpg"
    }]

    render() {
        const settings = {
            Center: true,
            focusOnSelect: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500
        };
        return (
            <div className="detailsPage">
                <HeaderComponent />
                <div className="container details-header">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div class="bread-crumbs title-section">
                                <a ><span>Canterbury</span></a>
                                <span>&nbsp;/&nbsp;</span><a ><span>Christchurch</span></a>
                                <span>&nbsp;/&nbsp;</span><a ><span>St Albans</span></a>
                            </div>
                            <div className="title-section">
                                <h1 className="placeText">Kenwyn Ave</h1>
                                <p className="locationText">8A Kenwyn Ave , St Albans , Christchurch</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 review-section">
                            <div className="rate-review">
                                <div className="star">
                                    <img src={images.icons.active_star} className="starImage" />
                                    <img src={images.icons.active_star} className="starImage" />
                                    <img src={images.icons.active_star} className="starImage" />
                                    <img src={images.icons.inactive_star} className="starImage" />
                                    <img src={images.icons.inactive_star} className="starImage" />
                                </div>
                                <div className="reviews">
                                    <a>1 &nbsp;&nbsp;review</a>
                                </div>
                            </div>
                            <div className="addButton-wrap">
                                <button type="button" class="btn btn-outline-secondary btn-block addButton">Add to Shortlist </button>
                            </div>
                        </div>
                    </div>
                </div >
                <Slider {...settings}>
                    {this.sliderItem.map((item) => {
                        return (
                            <div>
                                <div style={{ height: 250 }}>
                                    <img src={item.images} resizeMode="cover" />
                                </div>

                            </div>)
                    })}
                </Slider>
                <div className="container details-body">
                    <div className="row">
                        <div className="col-md-7 col-sm-12">
                            <div className="feature-wrap row">
                                <div className="col-md-4 col-4 features">
                                    <h3>4</h3>
                                    <p>Max Guest</p>
                                </div>
                                <div className="col-md-4 col-4 features">
                                    <h3>1</h3>
                                    <p>Bedroom</p>
                                </div>
                                <div className="col-md-4 col-4 features">
                                    <h3>2</h3>
                                    <p>Bathroom</p>
                                </div>
                            </div>
                            <div className="decription-section">
                                <h2>About this Holiday House</h2>
                                <p>
                                    Strasbourge Cottage is a  stone throw from the village yet private and secluded.  For a couples retreat or a small family weekend away, our cottage is the perfect spot to relax and central to everything Martinborough has to offer.
                                    {"\n"}
                                    Our charming property offers two bedrooms with a queen bed and two singles in the second room.  A separate lounge with a fabulous woodburner to keep warm in winter and in summer entertaining is a breeze on  the large sunny deck (BBQ provided) under the grapevine while surrounded by the beautiful roses.
                                    {"\n"}
                                    A fully fenced private section for children to play; and dogs are welcome at a small charge (please enquire).
                                    {"\n"}
                                    Coffee, tea, sugar, milk and muesli are included in your stay.
                                    {"\n"}
                                    Continuous hot water with our newly installed Rinnai System and free Wifi available.
                                    {"\n"}
                                    Four lovely bikes to cruise around Martinborough enjoying everything the area has to offer.
                                    {"\n"}
                                    Check in is from 2pm (we may be able to accommodate earlier upon request) and check out is 10am the day of your departure.
                                    {"\n"}
                                    A cleaning fee of $35.00 is charged per stay.
                                </p>
                            </div>
                            <div className="decription-section">
                                <h2>About this Holiday House</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        );
    }
}

export default DetailsPage;