import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isSome, renderIf } from 'core/utils';
import { DatePicker } from 'core/components';
import { defaultTemplate } from 'core/hoc';

const DatePickerFieldTemplate = function({ field, t, ...otherProps }) {
    const {value, onChange, ...otherFieldProps} = field.bind();

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    const warningClasses = classNames({
        'input--warning': !field.isValid && field.touched && !field.isDirty
    });
    const maxValue = field.rules && field.rules.indexOf('before_or_equal_date') !== -1 ? field.rules.substring(field.rules.indexOf('before_or_equal_date')).split(':')[1] : null;
    
    if(maxValue){
        otherFieldProps.max = new Date(maxValue);
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
                <p className='type--tiny type--color--error'>{field.localizedError}</p>
            )}
        </div>
    );
};

DatePickerFieldTemplate.propTypes = {
    field: PropTypes.object.isRequired,
    t: PropTypes.any
};

export default defaultTemplate(DatePickerFieldTemplate);
