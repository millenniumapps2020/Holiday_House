import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DateRangePickerPhrases, DateRangePickerShape, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { withStyles } from 'react-with-styles';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import './DateComponent.css';

ThemedStyleSheet.registerTheme({
    reactDates: {
        ...DefaultTheme.reactDates,
        color: {
            ...DefaultTheme.reactDates.color,
            highlighted: {
                backgroundColor: '#82E0AA',
                backgroundColor_active: '#58D68D',
                backgroundColor_hover: '#58D68D',
                color: '#186A3B',
                color_active: '#186A3B',
                color_hover: '#186A3B',
            },
        },
    },
});
class DateRangeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guestDropdownView: false,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
            endDate: null,
            focusedInput: null,
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
        if (this.checkIndateRef && !this.checkIndateRef.contains(target)) {
            this.setState({ checkIndateVisible: false })
        }
        if (this.checkOutdateRef && !this.checkOutdateRef.contains(target)) {
            this.setState({ checkOutdateVisible: false })
        }
    }

    setDate(date, key) {
        var fomatDate = date ? date.format('DD/MM/YYYY') : '';
        console.log('fomatDate', fomatDate);
        this.props.setDate(fomatDate, key)
    }




    onDatesChange({ startDate, endDate }) {
        const { stateDateWrapper } = this.props;
        this.setState({
            startDate: startDate && stateDateWrapper(startDate),
            endDate: endDate && stateDateWrapper(endDate),
        });
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        return (
            <div>
                <DayPickerRangeController
                    numberOfMonths={2}
                    startDateId="startDate"
                    endDateId="endDate"
                    noBorder={true}
                    isOutsideRange={day => {
                        if (moment().diff(day) > 0) {
                            return true
                        }
                        return moment(day) <= moment().subtract(1, 'year')
                    }}
                />

                {/* <DateRangePicker
                    // orientation="horizontal"
                    reopenPickerOnClearDates={true}
                    startDatePlaceholderText="Check in"
                    endDatePlaceholderText="Check out"
                    showDefaultInputIcon={true}
                    showClearDates={true}
                    small={true}
                    monthFormat={"MMM YYYY"}
                    displayFormat={"DD/MM/YYYY"}
                    numberOfMonths={1}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                        this.setState({ startDate, endDate }, () => {
                            this.setDate(startDate, 'checkIndate')
                            this.setDate(endDate, 'checkOutdate')

                        })
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
                /> */}
            </div>
        );
    }
}
export default withStyles(() => (ThemedStyleSheet))(DateRangeComponent);