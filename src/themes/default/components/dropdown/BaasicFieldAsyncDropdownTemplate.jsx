import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

function BaasicFieldAsyncDropdownTemplate({ store, field, label = null }) {
  const {
    defaultValue,
    options,
    onChange,
    loading,
    value
  } = store;

  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{label ? label : field.label} <strong>{field.disabled ? 'Disabled' : ''}</strong></label>
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
        defaultOptions={options.initFetch} //  tells the control to immediately fire the remote request, described by your loadOptions
        loadOptions={(input, callback) => {
          store.onFilter({ value: input }).then(() => {
            if (field) {
              store._value = field.value;
              onChange(store.value);
            }
            callback(store.items);
          });
        }}
      />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
}

export default defaultTemplate(BaasicFieldAsyncDropdownTemplate);
