import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSome, renderIf } from 'core/utils';
import { DatePicker } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const DatePickerFieldTemplate = function ({ field, disabled, t, showLabel = true, ...otherProps }) {
    const { value, onChange, ...otherFieldProps } = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    const warningClasses = classNames({
        'input--warning': !field.isValid && field.touched && !field.isDirty
    });
    let maxValue =
        field.rules && field.rules.indexOf('before_or_equal_date') !== -1
            ? field.rules.substring(field.rules.indexOf('before_or_equal_date')).split(':')[1]
            : null;
    if (maxValue && maxValue.includes('|')) {
        maxValue = maxValue.substring(0, maxValue.indexOf('|'));
    }
    let minValue = field.rules && field.rules.indexOf('min_date') !== -1 ? field.rules.substring(field.rules.indexOf('min_date')).split(':')[1] : null;
    if (minValue && minValue.includes('|')) {
        minValue = minValue.substring(0, minValue.indexOf('|'));
    }

    if (maxValue) {
        otherFieldProps.max = new Date(maxValue);
    }
    if (minValue) {
        otherFieldProps.min = new Date(minValue);
    }

    return (
        <div>
            {showLabel &&
                <label className="form__group__label">
                    {t(field.label)}
                    {requiredMark}
                </label>}
            <DatePicker
                {...otherProps}
                {...otherFieldProps}
                format={field.initialSetup.format}
                className={warningClasses}
                value={value ? new Date(value) : null}
                onChange={onChange}
                disabled={disabled || otherFieldProps.disabled}
            />
            {renderIf(isSome(field.localizedError))(
                <p className="type--tny type--color--warning u-mar--top--nano">{field.localizedError}</p>
            )}
        </div>
    );
}

DatePickerFieldTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    t: PropTypes.any,
};

export default defaultTemplate(DatePickerFieldTemplate);
