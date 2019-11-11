import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumericInput } from 'core/components';
import '@progress/kendo-react-intl'

const NumericInputRangeTemplate = defaultTemplate((props) => {
    const { t, valueMin, valueMax, onChangeMin, onChangeMax, format, step, labelMin, labelMax, required,
        className, disabled, name, placeholderMin, placeholderMax } = props;
    const showLabel = props.showLabel === undefined ? true : props.showLabel;

    const requiredMark = required ? <span>*</span> : null;
    const handleFocus = (event) => { event.target.select(); }

    const onChangeMinFn = (event) => {
        const value = event.target.value;
        onChangeMin(value);
    }

    const onChangeMaxFn = (event) => {
        const value = event.target.value;
        onChangeMax(value);
    }

    return (
        <div className='row'>
            <div className="col col-sml-6 col-med-6 col-lrg-6" onFocus={handleFocus}>
                {showLabel && <div className='form__group__label'>{t(labelMin)}{requiredMark}</div>}
                <NumericInput
                    className={className || 'input--numeric'}
                    name={name + '_min'}
                    max={valueMax}
                    format={format}
                    disabled={disabled}
                    onChange={onChangeMinFn}
                    value={valueMin}
                    step={step}
                    placeholder={t(placeholderMin)}
                />
            </div>
            <div className="col col-sml-6 col-med-6 col-lrg-6" onFocus={handleFocus}>
                {showLabel && <div className='form__group__label'>{t(labelMax)}{requiredMark}</div>}
                <NumericInput
                    className={className || 'input--numeric'}
                    name={name + '_max'}
                    min={valueMin}
                    format={format}
                    disabled={disabled}
                    onChange={onChangeMaxFn}
                    value={valueMax}
                    step={step}
                    placeholder={t(placeholderMax)}
                />
            </div>
        </div>
    )
});

export default NumericInputRangeTemplate;
