import React from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const DateRangePickerFieldTemplate = function (props) {
    const { fromField, toField, t } = props;
    const required = fromField.rules && fromField.rules.indexOf('required') !== -1;
    let values = {
        start: !fromField.value ? null : new Date(fromField.value),
        end: !toField.value ? null : new Date(toField.value),
    };

    const onChange = e => {
        fromField.onChange(e.value.start);
        toField.onChange(e.value.end);
    };

    const errors = {
        fromError: fromField.localizedError,
        toError: toField.localizedError,
    };

    return <DateRangePicker value={values} onChange={onChange} t={t} errors={errors} required={required} />;
};

DateRangePickerFieldTemplate.propTypes = {
    fromField: PropTypes.object,
    toField: PropTypes.object,
    t: PropTypes.func,
};

export default defaultTemplate(DateRangePickerFieldTemplate);
