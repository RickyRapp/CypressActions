import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

import { MaskedTextBox } from '@progress/kendo-react-inputs';
import '@progress/kendo-react-intl'

const MaskedInputTemplate = defaultTemplate((props) => {
    const { t, value, onChange, mask, label, required, className, disabled, name } = props;
    const showLabel = props.showLabel === undefined ? true : props.showLabel;

    const requiredMark = required ? <span className="type--color--note u-mar--left--tny">*</span> : null;
    const handleFocus = (event) => { event.target.select(); }

    return (
        <div onFocus={handleFocus}>
            {showLabel && <div className='form__group__label'>{t(label)}{requiredMark}</div>}
            <MaskedTextBox
                className={className}
                name={name}
                mask={mask}
                disabled={disabled}
                onChange={onChange}
                value={value}
            />
        </div>
    )
});

MaskedInputTemplate.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    mask: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    t: PropTypes.func
};

MaskedInputTemplate.defaultProps = {
    type: 'text',
    showLabel: true,
    labelClassName: 'form__group__label',
    className: 'input input--lrg input--text'
};

export default MaskedInputTemplate;
