import React from 'react';
import PropTypes from 'prop-types';
import { NullableSwitch } from 'core/components';
import {defaultTemplate} from 'core/hoc';

function QueryNullableSwitchTemplate({ queryUtility, propertyName, ...props }) {
    return (
        <NullableSwitch
            value={queryUtility.filter[propertyName]}
            onChange={(newValue) => queryUtility.filter[propertyName] = newValue}
            {...props}
        />
    )
}

QueryNullableSwitchTemplate.propTypes = {
    queryUtility: PropTypes.object,
    propertyName: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string
};

export default defaultTemplate(QueryNullableSwitchTemplate);
