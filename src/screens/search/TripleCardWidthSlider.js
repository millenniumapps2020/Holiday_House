import React, { Component } from "react";
import Slider from "react-slick";
import './SearchStyle.css';
import HouseCardComponent from "../../components/HouseCardComponent";
import { SCREENS } from "../../common/Constants";

export default class TripleCardWidthSlider extends Component {


    dicoverCardPressed = (item) => {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }

    render() {
        const settings = {
            className: "slider variable-width",
            dots: false,
            infinite: true,
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
        };
        console.log('this.props.searchList', this.props.data)

        return this.props.data ?
            <Slider {...settings}>
                {this.props.data.map((item) => {
                    return (
                        <div className="sliderClass">
                            <HouseCardComponent key="searchComponent" name="sliderHouseHold" data={item} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                        </div>
                    );
                })}
            </Slider>
            : null;
    }
}