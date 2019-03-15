import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { defaultTemplate } from 'core/utils';

function BaasicAsyncDropdownTemplate({ store }) {
  const {
    defaultValue,
    options,
    onChange,
    loading,
    value
  } = store;

  return (
    <AsyncSelect
      value={value}
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
      defaultOptions={true} //  tells the control to immediately fire the remote request, described by your loadOptions
      loadOptions={(input, callback) => {
        store.onFilter({ value: input }).then(() => {
          callback(store.items);
        });
      }}
    />
  );
}

export default defaultTemplate(BaasicAsyncDropdownTemplate);
