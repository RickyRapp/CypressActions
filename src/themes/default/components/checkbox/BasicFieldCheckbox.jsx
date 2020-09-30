import React from 'react';

import PropTypes from 'prop-types';

import { BasicCheckbox } from 'core/components';
import { defaultTemplate } from 'core/hoc';
import { isSome, renderIf } from 'core/utils';

function BasicFieldCheckboxTemplate({ field, onChange }) {
    const handleOnChange = (event) => {
        field.onChange(event);

        if (onChange) {
            onChange(event);
        }
    }
    return <div>
        <BasicCheckbox {...field.bind()} onChange={handleOnChange} />
        {(!field.isValid || field.hasError) &&
            renderIf(isSome(field.localizedError))(
                <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>
            )}
    </div>
}

BasicFieldCheckboxTemplate.propTypes = {
    field: PropTypes.any,
    onChange: PropTypes.func
};

export default defaultTemplate(BasicFieldCheckboxTemplate);
