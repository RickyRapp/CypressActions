import React from 'react';
import PropTypes from 'prop-types';

import { BasicCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function BasicQueryCheckboxTemplate({ id, queryUtility, fetchCollection, propertyName, label, onChange, checked }) {
    const handleChange = onChange || (() => queryUtility.filter.toggle(propertyName));
    const value = checked || !!queryUtility.filter[propertyName];

    return (
        <BasicCheckbox
            type="checkbox"
            id={id}
            onChange={() => {
                handleChange();
                fetchCollection ? fetchCollection() : null;
            }}
            checked={value}
            label={label}
        />
    );
}

BasicQueryCheckboxTemplate.propTypes = {
    id: PropTypes.string,
    queryUtility: PropTypes.object,
    fetchCollection: PropTypes.func,
    propertyName: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    t: PropTypes.func,
};

export default defaultTemplate(BasicQueryCheckboxTemplate);
