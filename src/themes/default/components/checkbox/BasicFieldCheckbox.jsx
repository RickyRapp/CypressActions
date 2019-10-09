import React from 'react';

import PropTypes from 'prop-types';

import { BasicCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function BasicFieldCheckboxTemplate({ field }) {
    return <BasicCheckbox {...field.bind()} />;
}

BasicFieldCheckboxTemplate.propTypes = {
    field: PropTypes.any
};

export default defaultTemplate(BasicFieldCheckboxTemplate);
