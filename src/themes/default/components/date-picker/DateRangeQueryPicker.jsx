import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { defaultTemplate } from 'core/hoc';
import { DateRangePicker } from 'core/components';
import { QueryUtility } from 'core/utils';
import { DateRangeQueryPickerStore } from 'core/stores';

class DateRangeQueryPickerTemplate extends React.Component {
    constructor(props) {
        super();

        this.queryUtility = props.queryUtility;
        this.store = props.store;
        this.fromPropertyName = props.fromPropertyName;
        this.toPropertyName = props.toPropertyName;
        this.t = props.t;
        this.errors = null;

        let val = {
            start: this.queryUtility.filter[this.fromPropertyName] ? new Date(this.queryUtility.filter[this.fromPropertyName]) : null,
            end: this.queryUtility.filter[this.toPropertyName] ? new Date(this.queryUtility.filter[this.toPropertyName]) : null,
        }

        this.store.setValue(val)
    }

    onValueChange = (event) => {
        let { value } = event.target;
        this.store.setError(null);
        this.store.setValue(value);

        let start = null;
        if (value.start)
            start = moment(value.start).format('YYYY-MM-DD');
        let end = null;
        if (value.end)
            end = moment(value.end).format('YYYY-MM-DD');

        // if start later than end
        // ------------------------------------------------------
        if (start && end && new Date(start) > new Date(end)) {
            this.store.setError({
                fromError: null,
                toError: true
            })
            end = null;
        }
        // ------------------------------------------------------

        this.queryUtility.filter.set(this.fromPropertyName, start);
        this.queryUtility.filter.set(this.toPropertyName, end);
    }

    render() {
        return <DateRangePicker value={this.store.value} onChange={this.onValueChange} t={this.t} errors={this.store.errors} />;
    }
}

DateRangeQueryPickerTemplate.propTypes = {
    queryUtility: PropTypes.instanceOf(QueryUtility),
    store: PropTypes.instanceOf(DateRangeQueryPickerStore),
    fromPropertyName: PropTypes.string,
    toPropertyName: PropTypes.string,
    t: PropTypes.func
};

export default defaultTemplate(DateRangeQueryPickerTemplate);
