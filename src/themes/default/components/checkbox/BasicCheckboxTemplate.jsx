import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const className = suffix => (suffix ? `${suffix}` : '');
const BasicCheckboxTemplate = function ({ id, label, checked, onChange, t, disabled, classSuffix = null }) {
    return (
        <React.Fragment>
            <input
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                type="checkbox"
                className={`input--check${className(classSuffix)}`}
            />
            <label htmlFor={id}>{t(label)}</label>
        </React.Fragment>
    );
};

BasicCheckboxTemplate.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    classSuffix: PropTypes.string,
    t: PropTypes.func,
};

BasicCheckboxTemplate.defaultProps = {
    disabled: false,
};

export default defaultTemplate(BasicCheckboxTemplate);
