import React, { Component } from 'react';

class PriceComponent extends Component {
    state = {
        priceDropdownView: false,
        children: 1,
        adults: 1,
        higherPrice: 300,
        lowerPrice: 30
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

    render() {
        var { priceDropdownView, lowerPrice, higherPrice } = this.state;

        return (
            <div className="col input-controller location-controller" ref={(node) => this.guestRef = node}>
                <div className="tab" onClick={() => this.onGuestChange(true)}>Price</div>
                {priceDropdownView ?
                    <div className="guest-drowndown-wrap" style={{ minWidth: 300 }}>
                        <div className="guest-wrap">
                            <p>What is your nightly budget?</p>
                            <div style={{ height: 30, paddingTop: 30, paddingBottom: 30 }} >
                                <span style={{ float: "left" }}>
                                    $<input type="number" name="min" min="0" max="1000" onChange={(e) => this.setState({ lowerPrice: e.target.value })} value={lowerPrice} className="price_input_button" />
                                </span>
                                <span style={{ float: "right" }}>
                                    $<input type="number" name="max" min="0" max="1000" onChange={(e) => this.setState({ higherPrice: e.target.value })} value={higherPrice} className="price_input_button" />
                                </span>
                            </div>
                        </div>
                        <div className="guest-wrap" style={{ justifyContent: "flex-end", display: "flex" }}>
                            <div className="row-spaceBetween ">
                                <button class="btn btn-primary apply-button" onClick={() => this.addGeustDetails()}>Apply</button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        );
    }
}
export default PriceComponent;