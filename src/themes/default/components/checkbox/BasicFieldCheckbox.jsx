import React from 'react';

import PropTypes from 'prop-types';

import { BasicCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function BasicFieldCheckboxTemplate({ field, onChange }) {
    const handleOnChange = (event) => {
        field.onChange(event);

        if (onChange) {
            onChange(event);
        }
    }
    return <BasicCheckbox {...field.bind()} onChange={handleOnChange} />;
}

BasicFieldCheckboxTemplate.propTypes = {
    field: PropTypes.any,
    onChange: PropTypes.func
};

export default defaultTemplate(BasicFieldCheckboxTemplate);
