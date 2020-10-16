import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown, DateRangePicker } from 'core/components';
import { QueryUtility } from 'core/utils';
import { DateRangeQueryPickerStore } from 'core/stores';

class DateRangeQueryPickerTemplate extends React.Component {
    constructor(props) {
        super();

        this.queryUtility = props.queryUtility;
        this.store = props.store;
        this.fromPropertyName = this.store.options.fromPropertyName;
        this.toPropertyName = this.store.options.toPropertyName;
        this.t = props.t;
        this.errors = null;

        let val = {
            start: this.queryUtility.filter[this.fromPropertyName] ? new Date(this.queryUtility.filter[this.fromPropertyName]) : null,
            end: this.queryUtility.filter[this.toPropertyName] ? new Date(this.queryUtility.filter[this.toPropertyName]) : null,
        }

        if (this.store.options.advancedSearch) {
            this.timePeriodDropdownStoreOnChange = (event) => {
                const { value } = event.target;
                if (value) {
                    const currentDate = new Date();
                    const now_utc = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 0, 0, 0);
                    let start = null;
                    let end = null;
                    if (value.id === 0) {
                        start = moment(new Date(now_utc)).startOf('week').toDate();
                        end = moment(new Date(now_utc)).endOf('week').toDate();
                    }
                    else if (value.id === 1) {
                        start = moment(new Date(now_utc)).startOf('month').toDate();
                        end = moment(new Date(now_utc)).endOf('month').toDate();
                    }
                    else if (value.id === 2) {
                        start = moment(new Date(now_utc)).add(-7, 'days').startOf('week').toDate();
                        end = moment(new Date(now_utc)).add(-7, 'days').endOf('week').toDate();
                    }
                    else if (value.id === 3) {
                        start = moment(new Date(now_utc)).add(-1, 'months').startOf('month').toDate();
                        end = moment(new Date(now_utc)).add(-1, 'months').endOf('month').toDate();
                    }
                    this.store.setValue({ start: start, end: end });
                }
                this.queryUtility.filter[this.fromPropertyName] = moment(this.store.value.start).format('YYYY-MM-DD');
                this.queryUtility.filter[this.toPropertyName] = moment(this.store.value.end).format('YYYY-MM-DD');
                this.store.timePeriodDropdownStore.onChange(value)
            }
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
        return (
            <React.Fragment >
                <DateRangePicker value={this.store.value} options={this.store.options} onChange={this.onValueChange} t={this.t} errors={this.store.errors} />
                {this.store.options.advancedSearch &&
                    <BaasicDropdown
                        store={this.store.timePeriodDropdownStore}
                        onChange={this.timePeriodDropdownStoreOnChange}
                    />
                }
            </React.Fragment >
        )
    }
}

DateRangeQueryPickerTemplate.propTypes = {
    queryUtility: PropTypes.instanceOf(QueryUtility),
    store: PropTypes.instanceOf(DateRangeQueryPickerStore),
    t: PropTypes.func
};

export default defaultTemplate(DateRangeQueryPickerTemplate);
