import React from 'react';
import PropTypes from 'prop-types';
import { BaasicSwitch } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function BaasicFieldSwitchTemplate({ field, disabled, onChange, regular }) {
    const { ...otherProps } = field.bind();
    const onChangeFn = e => {
        field.onChange(e);
        if (onChange) {
            onChange(e);
        }
    };
    return (
        <BaasicSwitch
            {...field.bind()}
            onChange={onChangeFn}
            disabled={disabled || otherProps.disabled}
            regular={regular}
        />
    );
}

BaasicFieldSwitchTemplate.propTypes = {
    field: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    regular: PropTypes.bool
};

export default defaultTemplate(BaasicFieldSwitchTemplate);
