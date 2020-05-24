import React, { Component } from 'react'

class GuestCountComponent extends Component {
    state = {
        guestDropdownView: false,
        children: 0,
        adults: 1,
        isPets: false
    }
    componentWillMount() {
        var guest_details = this.props.initial;
        if(guest_details && Object.keys(guest_details).langth > 0) {
            this.setState({
                children: guest_details.children ? guest_details.children : 1,
                adults: guest_details.adults ? guest_details.adults : 1,
                isPets: guest_details.isPets ? true : false
            })
        }
        if(this.props.type == "detailsPage") {
            this.addGeustDetails();
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    onGuestChange = (guestDropdownView) => {
        this.setState({ guestDropdownView })
    }

    handleClickOutside = (event) => {
        var target = event.target;
        if (this.guestRef && !this.guestRef.contains(target)) {
            this.onGuestChange(false)
        }
    }

    changeGuest(key, type) {
        var value = this.state[key];
        if (type == "minus") {
            if ((key == "adults" && value != 1) || (key != "adults" && value !== 0)) {
                this.setState({ [key]: value - 1 })
            }
        } else {
            this.setState({ [key]: value + 1 })
        }
    }
    addGeustDetails() {
        var count = (this.state.adults + this.state.children)
        this.setState({ guestDropdownView: false, guestCount: count > 0 ? ((count + ' Guests') + (this.state.isPets == true ? ', Pets' : '')) : '' })
        var details = {
            'adults': this.state.adults,
            'children': this.state.children,
            isPets: this.state.isPets
        };
        this.props.onSetGuestDetails(details);
    }
    render() {
        var { guestDropdownView, guestCount } = this.state;
        return (
            <div className="col input-controller location-controller" ref={(node) => this.guestRef = node}>
                {this.props.name == "headerPage" ? <div className={"tab btn btn-basic" + (guestCount ? " selected-search-btn" : "")} onClick={() => this.onGuestChange(true)}>{guestCount ? guestCount : 'Guests'}</div> :
                    <input
                        onFocus={() => this.onGuestChange(true)}
                        value={guestCount}
                        className="guestInput guest-icon form-control"
                        placeholder="Guests"
                    />
                }
                {guestDropdownView ?
                    <div className="guest-drowndown-wrap" style={{ minWidth: 250 }}>
                        <div className="guest-wrap">
                            <h6>Adults</h6>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button id="" class="btn btn-action btn-number" onClick={() => this.changeGuest('adults', 'minus')}> - </button>
                                </div>
                                <input type="text" name="adults" class="form-control text-center" value={this.state.adults} />
                                <div class="input-group-append">
                                    <button id="searchUpAdultsBtn" class="btn btn-action btn-number" onClick={() => this.changeGuest('adults', 'plus')} > + </button>
                                </div>
                            </div>
                        </div>
                        <div className="guest-wrap">
                            <div className="row-spaceBetween">
                                <h6>children</h6>
                                <p>ages 3 to 16</p>
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button id="" class="btn btn-action btn-number" onClick={() => this.changeGuest('children', 'minus')}> - </button>
                                </div>
                                <input type="text" value={this.state.children} name="adults" class="form-control text-center" />
                                <div class="input-group-append">
                                    <button id="searchUpAdultsBtn" class="btn btn-action btn-number" onClick={() => this.changeGuest('children', 'plus')}> + </button>
                                </div>
                            </div>
                        </div>

                        <div className="guest-wrap">
                            <div className="row-spaceBetween">
                                <div class="position-relative form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" class="form-check-input" checked={this.state.isPets} onChange={(event) => this.setState({
                                            isPets: event.target.checked
                                        })} />
                                        <span>Pets</span>
                                    </label>
                                </div>
                                <button class="btn btn-primary apply-button" onClick={() => this.addGeustDetails()}>Apply</button>
                            </div>
                        </div>
                    </div> : null}
            </div>
        );
    }
}
export default GuestCountComponent;