import React from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { defaultTemplate } from "core/utils";

const DateRangePickerTemplate = function (props) {
    const { t, format, store, ...otherProps } = props;

    function internalOnChange(event) {
        if (props.onChange)
            props.onChange(event);
    }

    store.setErrors(props.errors)

    return (
        <DateRangePicker
            {...otherProps}
            format={t(format)}
            startDateInput={store.d1}
            endDateInput={store.d2}
            onChange={internalOnChange}
        />
    );
};



DateRangePickerTemplate.propTypes = {
    value: PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date)
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

DateRangePickerTemplate.defaultProps = {
    format: 'CORE.DATE_FORMAT.kendo-input-short',
};

export default defaultTemplate(DateRangePickerTemplate);
