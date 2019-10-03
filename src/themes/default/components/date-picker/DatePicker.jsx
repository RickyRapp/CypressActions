import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { defaultTemplate } from "core/utils";
import { dateFormatter } from 'core/utils';
import moment from 'moment';

const DatePickerTemplate = function ({
    value,
    defaultValue,
    onChange,
    timeZone,
    format = 'kendo-input-short',
    max,
    ...otherProps
}) {
    return (
        <DatePicker
            {...otherProps}
            value={value}
            max={max}
            format={dateFormatter.map(format)}
            onChange={(result) => {
                let value = moment(result.value).format("YYYY-MM-DD");
                if (value != "Invalid date")
                    onChange(new Date(value));
                else
                    onChange(new Date())
            }}
        />
    );
};

DatePickerTemplate.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    show: PropTypes.bool
};

export default defaultTemplate(DatePickerTemplate);
