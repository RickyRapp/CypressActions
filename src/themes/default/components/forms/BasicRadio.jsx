import React from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';

const BasicRadioTemplate = function (props) {
    const { t, field, value, label } = props;

    return (
        <div>
            <div className="form__group__label" htmlFor={field.id}>{t(label)}</div>
            <input {...field.bind()} value={value} checked={value === field.value} />
        </div>
    );
};

BasicRadioTemplate.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    t: PropTypes.any
};

export default defaultTemplate(BasicRadioTemplate);
