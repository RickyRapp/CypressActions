import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { defaultTemplate, isSome } from 'core/utils';

function BaasicAsyncDropdownTemplate({ store }) {
  const {
    defaultValue,
    options,
    onChange,
    loading,
    value,
    initFetch,
    items
  } = store;

  return (
    <AsyncSelect
      value={isSome(value) ? _.filter(items, function (x) { return _.includes(options.multi ? _.map(value, 'id') : value, x.id) }) : null}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={options.placeholder}
      isDisabled={options.disabled}
      isMulti={options.multi}
      isClearable={options.clearable}
      isLoading={loading}
      cacheOptions={true}
      getOptionLabel={option => option[options.textField]}
      getOptionValue={option => option[options.dataItemKey]}
      defaultOptions={initFetch} //  tells the control to immediately fire the remote request, described by your loadOptions
      loadOptions={(input, callback) => {
        store.onFilter({ value: input }).then(() => {
          callback(store.items);
        });
      }}
    />
  );
}

export default defaultTemplate(BaasicAsyncDropdownTemplate);
