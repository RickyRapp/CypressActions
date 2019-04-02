import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

function DropdownAsyncFilterTemplate({ store, queryUtility, name }) {
    const {
        options,
        onChange,
        items,
        defaultValue,
        loading
    } = store;

    return (
        <AsyncSelect
            value={isSome(queryUtility.filter[name]) ? _.filter(items, function (x) { return _.includes(queryUtility.filter[name], x.id) }) : null}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={options.placeholder}
            name={name}
            isDisabled={options.disabled}
            isMulti={options.multi}
            isClearable={options.clearable}
            isLoading={loading}
            cacheOptions={true}
            getOptionLabel={option => option[options.textField]}
            getOptionValue={option => option[options.dataItemKey]}
            defaultOptions={options.initFetch} //  tells the control to immediately fire the remote request, described by your loadOptions
            loadOptions={(input, callback) => {
                store.onFilter({ value: input }).then(() => {
                    callback(store.items);
                });
            }}
        />
    );
}


export default defaultTemplate(DropdownAsyncFilterTemplate);
