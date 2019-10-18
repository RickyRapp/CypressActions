import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isSome, renderIf } from 'core/utils';
import { DatePicker } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const DatePickerFieldTemplate = function ({ field, t, ...otherProps }) {
    const { value, onChange, ...otherFieldProps } = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    const warningClasses = classNames({
        'input--warning': !field.isValid && field.touched && !field.isDirty
    });
    const maxValue = field.rules && field.rules.indexOf('before_or_equal_date') !== -1 ? field.rules.substring(field.rules.indexOf('before_or_equal_date')).split(':')[1] : null;
    const minValue = field.rules && field.rules.indexOf('min_date') !== -1 ? field.rules.substring(field.rules.indexOf('min_date')).split(':')[1] : null;

    if (maxValue) {
        otherFieldProps.max = new Date(maxValue);
    }
    if (minValue) {
        otherFieldProps.min = new Date(minValue);
    }

    return (
        <div>
            <div className='form__group__label'>{t(field.label)}{requiredMark}</div>
            <DatePicker
                {...otherProps}
                {...otherFieldProps}
                format={field.initialSetup.format}
                className={warningClasses}
                value={value ? new Date(value) : null}
                onChange={onChange}
            />
            {renderIf(isSome(field.localizedError))(
                <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>
            )}
        </div>
    );
};

DatePickerFieldTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    t: PropTypes.any
};

export default defaultTemplate(DatePickerFieldTemplate);
