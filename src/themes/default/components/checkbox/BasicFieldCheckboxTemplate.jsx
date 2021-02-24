import React from 'react';

import PropTypes from 'prop-types';

import { BasicCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome, renderIf } from 'core/utils';

function BasicFieldCheckboxTemplate({ field, disabled, onChange, showLabel=true, toggleClass }) {
    const { value, ...otherProps } = field.bind();
    const onChangeFn = e => {
        field.onChange(e);
        if (onChange) {
            onChange(e);
        }
    };
    return (
        <React.Fragment>
            <BasicCheckbox
                {...field.bind()}
                showLabel={showLabel}
                checked={value}
                onChange={onChangeFn}
                classSuffix={field.initialSetup.classSuffix || toggleClass}
                disabled={disabled || otherProps.disabled}
            />
            {renderIf(isSome(field.localizedError))(
                <p className="validation__message">{field.localizedError}</p>
            )}
        </React.Fragment>
    );
}

BasicFieldCheckboxTemplate.propTypes = {
    field: PropTypes.any,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    showLabel: PropTypes.bool,
    toggleClass: PropTypes.string,
};

export default defaultTemplate(BasicFieldCheckboxTemplate);
