import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumericTextBox } from '@progress/kendo-react-inputs';
import '@progress/kendo-react-intl';

const NumericInputTemplate = defaultTemplate(props => {
    const { t, value, onChange, onBlur, format, label, max, min, required, className, disabled, name, placeholder } = props;
    const showLabel = props.showLabel === undefined ? true : props.showLabel;

    const requiredMark = required ? <span className="type--color--note u-mar--left--tny">*</span> : null;
    const handleFocus = event => {
        event.target.select();
    };

    return (
        <React.Fragment onFocus={handleFocus}>
            {showLabel && (
                <div className="form__group__label">
                    {t(label)}
                    {requiredMark}
                </div>
            )}
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
                placeholder={t(placeholder)}
                spinners={false}
            />
        </React.Fragment>
    );
});

export default NumericInputTemplate;
