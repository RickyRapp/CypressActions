import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumericTextBox } from '@progress/kendo-react-inputs';
import '@progress/kendo-react-intl'

const NumericInputTemplate = defaultTemplate((props) => {
    const { t, value, onChange, onBlur, format, step, label, max, min, required, className, disabled, name, placeholder } = props;
    const showLabel = props.showLabel === undefined ? true : props.showLabel;

    const requiredMark = required ? <span>*</span> : null;
    const handleFocus = (event) => { event.target.select(); }

    return (
        <div onFocus={handleFocus}>
            {showLabel && <div className='form__group__label'>{t(label)}{requiredMark}</div>}
            <NumericTextBox
                className={className}
                name={name}
                max={max}
                min={min}
                format={format}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                step={step}
                placeholder={t(placeholder)}
            />
        </div>
    )
});

export default NumericInputTemplate;
