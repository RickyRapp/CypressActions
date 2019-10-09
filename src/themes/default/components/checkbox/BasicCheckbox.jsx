import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const BasicCheckboxTemplate = function ({ id, label, checked, onChange, t, disabled }) {
    return (
        <React.Fragment>
            <input
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                type='checkbox'
                className='input input--check'
            />
            <label className='check' htmlFor={id} />
            <label className='spc--left--tny label' htmlFor={id}>
                {t(label)}
            </label>
        </React.Fragment>
    );
};

BasicCheckboxTemplate.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    t: PropTypes.func
};

BasicCheckboxTemplate.defaultProps = {
    disabled: false
};

export default defaultTemplate(BasicCheckboxTemplate);
