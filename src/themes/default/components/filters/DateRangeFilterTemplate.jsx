import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { defaultTemplate } from 'core/utils';
import PropTypes from 'prop-types';

class DateRangeFilterTemplate extends React.Component {
    static defaultProps = {
        numberOfMonths: 1,
    };
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
    }

    showFromMonth() {
        const fromDateString = this.props.queryUtility.filter[this.props.nameMin];
        const toDateString = this.props.queryUtility.filter[this.props.nameMax];
        const from = fromDateString ? new Date(fromDateString) : undefined;
        const to = toDateString ? new Date(toDateString) : undefined;

        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }

    handleFromChange(from) {
        this.props.queryUtility.filter[this.props.nameMin] = from ? moment(from).format('YYYY-MM-DD') : undefined;
    }
    handleToChange(to) {
        this.props.queryUtility.filter[this.props.nameMax] = to ? moment(to).format('YYYY-MM-DD') : undefined;
    }

    render() {
        const fromDateString = this.props.queryUtility.filter[this.props.nameMin];
        const toDateString = this.props.queryUtility.filter[this.props.nameMax];
        const from = fromDateString ? new Date(fromDateString) : undefined;
        const to = toDateString ? new Date(toDateString) : undefined;
        const modifiers = { start: from, end: to };

        return (
            <div className="inputgroup">
                <DayPickerInput
                    value={from}
                    placeholder="From"
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: this.props.numberOfMonths,
                        onDayClick: () => this.to.getInput().focus(),
                    }}
                    onDayChange={this.handleFromChange}
                />
                {' '}—{' '}
                <DayPickerInput
                    ref={el => (this.to = el)}
                    value={to}
                    placeholder="To"
                    format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { before: from },
                        modifiers,
                        month: from,
                        fromMonth: from,
                        numberOfMonths: this.props.numberOfMonths,
                    }}
                    onDayChange={this.handleToChange}
                />
            </div>
        );
    }
}

export default defaultTemplate(DateRangeFilterTemplate);