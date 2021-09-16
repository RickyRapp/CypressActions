import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { BaasicInput } from 'core/components';

const BasicRadioTemplate = function (props) {
    const { field, value, label, className, wrapperClassName, labelBeforeInput = false } = props;

    return (
        <div className={className}>
            <BaasicInput
                {...field.bind()}
                type="radio"
                id={value}
                name={value}
                value={value}
                checked={value === field.value}
                label={label}
                className={!wrapperClassName ? 'input--radio' : ''}
                labelBeforeInput={labelBeforeInput}
            />
        </div>
    );
};

BasicRadioTemplate.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    onChange: PropTypes.func,
    labelBeforeInput: PropTypes.bool,
    t: PropTypes.any,
};

export default defaultTemplate(BasicRadioTemplate);
