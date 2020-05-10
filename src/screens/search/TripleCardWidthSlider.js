import React, { Component } from 'react';
import Slider from "react-slick";
import './SearchStyle.css';
import HouseCardComponent from "../../components/HouseCardComponent";
import { SCREENS } from "../../common/Constants";


class TripleCardWidthSlider extends Component {

    dicoverCardPressed = (item) => {
        this.props.history.push(SCREENS.DETAILS, { propertyId: item.propertyId })
    }
    next = () => {
        this.slider.slickNext();
    }
    previous = () => {
        this.slider.slickPrev();
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
        if (this.props.type == "single") {
            settings.variableWidth = false;
            settings.centerMode = false;
            settings.arrows = false;
        }

        return <div className="searchPage-slider">{this.props.data ?
            <Slider ref={c => (this.slider = c)} {...settings}>
                {this.props.data.map((item) => {
                    return (
                        <div className={this.props.type == "single" ? "singleSlider" : "sliderClass"}>
                            <HouseCardComponent key="searchComponent" type={this.props.type} name="sliderHouseHold" data={item} onCardClick={(discoverData) => this.dicoverCardPressed(discoverData)} />
                        </div>
                    );
                })}
            </Slider>
            : null}
            {this.props.type == "single" ?
                <div className="arrowButton-wrap">
                    <button className="btn  btn-basic arrows-button" onClick={this.previous}>
                        Prev
                </button>
                    <button className="btn  btn-basic arrows-button" onClick={this.next}>
                        Next
                </button>
                </div>
                :
            null}
        </div>;
    }
}

export default TripleCardWidthSlider;