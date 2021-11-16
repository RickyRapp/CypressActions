import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicToggle } from 'core/components';

function BaasicFieldToggleTemplate({ field, disabled, onChange, showLabel = false, wrapperClassName }) {
    const { ...otherProps } = field.bind();
    const onChangeFn = () => {
        field.onChange(!field.value);
        if (onChange) {
            onChange(!field.value);
        }
    };

    return (
        <BaasicToggle
            {...field.bind()}
            onChange={onChangeFn}
            disabled={disabled || otherProps.disabled}
            showLabel={showLabel}
            wrapperClassName={wrapperClassName}
        />
    );
}

BaasicFieldToggleTemplate.propTypes = {
    field: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    showLabel: PropTypes.bool,
    wrapperClassName: PropTypes.string
};

export default defaultTemplate(BaasicFieldToggleTemplate);
