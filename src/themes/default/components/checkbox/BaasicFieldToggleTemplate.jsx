import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicToggle } from 'core/components';
import _ from 'lodash';

function BaasicFieldToggleTemplate({ field, disabled, onChange, showLabel = false }) {
    const { ...otherProps } = field.bind();
    const onChangeFn = e => {
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
        />
    );
}

BaasicFieldToggleTemplate.propTypes = {
    field: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default defaultTemplate(BaasicFieldToggleTemplate);
