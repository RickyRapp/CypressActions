import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'core/components';
import { QueryUtility } from "core/utils";
import { defaultTemplate } from "core/utils";
import moment from 'moment';

function DateQueryPickerTemplate({ queryUtility, propertyName, onChange, format, timeZone }) {
    function getValue() {
        return queryUtility.filter[propertyName]
            ? new Date(queryUtility.filter[propertyName])
            : null;
    }

    return (
        <DatePicker
            value={getValue()}
            onChange={(value) => {
                if (value) {
                    queryUtility.filter.set(propertyName, moment.tz(value, timeZone).format());
                }
            }}
        />
    )
}

DateQueryPickerTemplate.propTypes = {
    queryUtility: PropTypes.instanceOf(QueryUtility),
    propertyName: PropTypes.string,
    onChange: PropTypes.func
};

DateQueryPickerTemplate.defaultProps = {
    onChange: () => {
    }
};

export default defaultTemplate(DateQueryPickerTemplate);
