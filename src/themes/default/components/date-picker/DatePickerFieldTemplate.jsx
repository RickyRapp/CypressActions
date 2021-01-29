import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSome, renderIf } from 'core/utils';
import { DatePicker } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import moment from 'moment';

const DatePickerFieldTemplate = function ({ field, disabled, t, showLabel = true, ...otherProps }) {
    const { value, onChange, ...otherFieldProps } = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span className="type--color--note u-mar--left--tny">*</span> : null;

    const warningClasses = classNames({
        'input--warning': !field.isValid && field.touched && !field.isDirty
    });
    let maxValue = field.rules && field.rules.indexOf('before_or_equal_date') !== -1 ? field.rules.substring(field.rules.indexOf('before_or_equal_date')).split(':')[1] : null;
    if (maxValue && maxValue.includes('|')) {
        maxValue = maxValue.substring(0, maxValue.indexOf('|'));
    }
    let minValue = field.rules && field.rules.indexOf('min_date') !== -1 ? field.rules.substring(field.rules.indexOf('min_date')).split(':')[1] : '1900-01-01';
    if (minValue && minValue.includes('|')) {
        minValue = minValue.substring(0, minValue.indexOf('|'));
    }

    if (maxValue) {
        otherFieldProps.max = moment(maxValue).toDate();
    }
    if (minValue) {
        otherFieldProps.min = moment(minValue).toDate();
    }

    const convertToDate = (value) => {
        console.log(moment(value).toDate())
        return moment(value).toDate()
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
                value={value ? convertToDate(value) : null}
                onChange={onChange}
                disabled={disabled || otherFieldProps.disabled}
                clearable={!requiredMark}
            />
            {renderIf(isSome(field.localizedError))(
                <p className="validation__message">{field.localizedError}</p>
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
