import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

function BaasicFieldAsyncDropdownTemplate({ store, t, field, label = null }) {
  const {
    defaultValue,
    options,
    onChange,
    loading,
    items,
  } = store;

  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{label ? label : t(field.label)} </label>
      <AsyncSelect
        value={isSome(field) ? _.filter(items, function (x) { return _.includes(field.value, x.id) }) : null}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={field.placeholder}
        isDisabled={field.disabled}
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
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
}

export default defaultTemplate(BaasicFieldAsyncDropdownTemplate);
