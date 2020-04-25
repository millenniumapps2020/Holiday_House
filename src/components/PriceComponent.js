import React, { Component } from 'react';
import Rheostat from 'rheostat';
import 'rheostat/css/rheostat.css'
import { withStyles, withStylesPropTypes } from 'react-with-styles';
class PriceComponent extends Component {
    state = {
        priceDropdownView: false,
        children: 1,
        adults: 1,
        higherPrice: 300,
        lowerPrice: 30,
        priceString: ''
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    onGuestChange = (priceDropdownView) => {
        this.setState({ priceDropdownView })
    }

    handleClickOutside = (event) => {
        var target = event.target;
        if (this.guestRef && !this.guestRef.contains(target)) {
            this.onGuestChange(false)
        }
    }
    addPriceDetails() {
        var { lowerPrice, higherPrice } = this.state;
        var priceString = '$' + lowerPrice + ' - $' + higherPrice;
        this.setState({ priceString });
        this.props.onCallBack({ lowerPrice: lowerPrice, higherPrice: higherPrice });
    }
    render() {
        var { priceDropdownView, lowerPrice, higherPrice,priceString } = this.state;

        return (
            <div className="col  d-none d-lg-block input-controller location-controller" ref={(node) => this.guestRef = node}>
                <div className={"tab btn btn-basic"+(priceString?" selected-search-btn":"")} onClick={() => this.onGuestChange(true)}>{priceString?priceString:'Price'}</div>
                {priceDropdownView ?
                    <div className="guest-drowndown-wrap" style={{ minWidth: 300 }}>
                        <div className="guest-wrap">
                            <p>What is your nightly budget?</p>
                            <div style={{ height: 30, paddingTop: 30, paddingBottom: 30 }} >
                                <span style={{ float: "left" }}>
                                    $<input type="number" name="min" min="0" max="999" onChange={(e) => {
                                        var value = e.target.value;
                                        if ((+value) < 1000) {
                                            this.setState({ lowerPrice: value })
                                        }
                                    }} value={lowerPrice} className="price_input_button" />
                                </span>
                                <span style={{ float: "right" }}>
                                    $<input type="number" name="max" min="10" max="1000" onChange={(e) => {
                                        var value = e.target.value;
                                        if ((+value) <= 1000) {
                                            this.setState({ higherPrice: value })
                                        }
                                    }} value={higherPrice} className="price_input_button" />+
                                </span>
                            </div>
                        </div>
                        <div className="price-slider">
                            <Rheostat
                                onChange={(data) => {
                                    this.setState({ lowerPrice: data.values[0], higherPrice: data.values[1] });
                                }}
                                min={0}
                                max={1000}
                                values={[(+lowerPrice), (+higherPrice)]}
                                borderRadius='50%'
                            />
                        </div>


                        <div className="guest-wrap" style={{ justifyContent: "flex-end", display: "flex" }}>
                            <div className="row-spaceBetween ">
                                <button class="btn btn-primary apply-button" onClick={() => this.addPriceDetails()}>Apply</button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        );
    }
}
export default PriceComponent;