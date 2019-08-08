import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from 'core/utils';

function BaasicDropdownTemplate({ store, onChangeOverride, valueOverride }) {
    const {
        options,
        onChange,
        value,
        items
    } = store;

    return (
        <Select
            value={valueOverride || value}
            onChange={onChangeOverride || onChange}
            options={items}
            isMulti={options.multi}
            placeholder={options.placeholder}
            name={options.name}
            isSearchable={options.isSearchable}
            isClearable={options.isClearable}
            className={options.className}
            classNamePrefix={options.classNamePrefix}
            autoFocus={options.autoFocus}
            getOptionLabel={option => option[options.textField]}
            getOptionValue={option => option[options.dataItemKey]}
        />
    )
}

export default defaultTemplate(BaasicDropdownTemplate);
