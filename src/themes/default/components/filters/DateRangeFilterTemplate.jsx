import React from 'react';
import { action, observable } from 'mobx';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class DateRangeFilterTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);


    }

    onDatesChange({ startDate, endDate }) {
        if (startDate)
            this.props.queryUtility.filter[this.props.nameMin] = startDate.format('YYYY-MM-DD');
        else
            this.props.queryUtility.filter[this.props.nameMin] = null;

        if (endDate)
            this.props.queryUtility.filter[this.props.nameMax] = endDate.format('YYYY-MM-DD');
        else
            this.props.queryUtility.filter[this.props.nameMax] = null;
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const {
            queryUtility,
            nameMin,
            nameMax,
            placeholderStartDate,
            placeholderEndDate,
            isClearable
        } = this.props;

        const { focusedInput } = this.state;

        return (
            <div>
                <DateRangePicker
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={queryUtility.filter[nameMin] instanceof moment ? queryUtility.filter[nameMin] : (queryUtility.filter[nameMin] ? moment(queryUtility.filter[nameMin]) : null)}
                    startDateId={nameMin}
                    endDate={queryUtility.filter[nameMax] instanceof moment ? queryUtility.filter[nameMax] : (queryUtility.filter[nameMax] ? moment(queryUtility.filter[nameMax]) : null)}
                    endDateId={nameMax}
                    showClearDates={isClearable}
                    startDatePlaceholderText={placeholderStartDate}
                    endDatePlaceholderText={placeholderEndDate}
                    small={true}
                    keepOpenOnDateSelect={true}
                    hideKeyboardShortcutsPanel={true}
                />
            </div>
        );
    }
}

DateRangeFilterTemplate.propTypes = {
    queryUtility: PropTypes.object,
    nameMin: PropTypes.string,
    nameMax: PropTypes.string,
    className: PropTypes.string,
    placeholderStartDate: PropTypes.string,
    placeholderEndDate: PropTypes.string,
    isClearable: PropTypes.bool
};

DateRangeFilterTemplate.defaultProps = {
    nameMin: 'startDate',
    nameMax: 'endDate',
    className: 'input input--med input--search w--250--px',
    placeholderStartDate: 'Start Date',
    placeholderEndDate: 'End Date',
    isClearable: true
};

export default defaultTemplate(DateRangeFilterTemplate);