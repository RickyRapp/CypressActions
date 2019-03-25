import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from 'core/utils';
import _ from 'lodash';

function DropdownFilterTemplate({ store, queryUtility, name }) {
    const {
        options,
        onChange,
        items,
    } = store;

    return (
        <Select
            value={queryUtility.filter[name] ? _.filter(items, function (x) { return _.includes(queryUtility.filter[name], x.id) }) : null}
            onChange={onChange}
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

export default defaultTemplate(DropdownFilterTemplate);
