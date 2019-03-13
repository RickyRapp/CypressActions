import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from 'core/utils';

function BaasicDropdownTemplate({ store }) {
    const {
        options,
        onChange,
        value,
        items
    } = store;

    return (
        <Select
            value={value}
            onChange={onChange}
            options={items}
            isMulti={options.multi}
            placeholder={options.placeholder}
            name={options.name}
            isSearchable={options.isSearchable}
            className={options.className}
            classNamePrefix={options.classNamePrefix}
            autoFocus={options.autoFocus}
            getOptionLabel={option => option[options.textField]}
            getOptionValue={option => option[options.dataItemKey]}
        />
    )
}

export default defaultTemplate(BaasicDropdownTemplate);
