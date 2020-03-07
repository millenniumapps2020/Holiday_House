import React, { Component } from 'react'
import Calendar from 'react-calendar';
import moment from 'moment';
import images from '.././assets/images'


class DateComponent extends Component {
    state = {
        guestDropdownView: false,
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
        if (this.checkIndateRef && !this.checkIndateRef.contains(target)) {
            this.setState({ checkIndateVisible: false })
        }
        if (this.checkOutdateRef && !this.checkOutdateRef.contains(target)) {
            this.setState({ checkOutdateVisible: false })
        }
    }

    setDate(date, key) {
        var fomatDate = moment(date).format('DD/MM/YYYY');
        this.setState({ [key]: fomatDate })
        this.props.setDate(fomatDate,key)
    }
    render() {
        return (
            <div className="col input-controller date-controller">
                <div ref={(node) => this.checkIndateRef = node}>
                    <input
                        onClick={() => this.setState({ checkIndateVisible: true })}
                        type="text"
                        value={this.state.checkIndate}
                        className="guestInput calendar-icon start-date form-control"
                        placeholder="Check in"
                    />
                    {this.state.checkIndateVisible ?
                        <div style={{ position: 'absolute', zIndex: 10000 }}>
                            <Calendar
                                minDate={new Date()}
                                onChange={(date) => this.setDate(date,'checkIndate')}
                                value={this.state.date}
                            />
                        </div> : null}
                </div>
                <div ref={(node) => this.checkOutdateRef = node}>
                    <input
                        onClick={() => this.setState({ checkOutdateVisible: true })}
                        type="text"
                        value={this.state.checkOutdate}
                        className="guestInput end-date form-control"
                        placeholder="Check out"
                    />
                    {this.state.checkOutdateVisible ?
                        <div style={{ position: 'absolute', zIndex: 10000 }}>
                            <Calendar
                                minDate={new Date()}
                                onChange={(date) => this.setDate(date, 'checkOutdate')}
                                value={this.state.date}
                            />
                        </div>

                        : null}
                </div>
            </div>
        );
    }
}
export default DateComponent;