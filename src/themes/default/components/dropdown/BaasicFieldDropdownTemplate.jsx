import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';
import _ from 'lodash';

function BaasicFieldDropdownTemplate({ store, field, label = null, t }) {
    const {
        options,
        onChange,
        items
    } = store;

    return (
        <div className="inputgroup">
            <label htmlFor={field.id}>{label ? label : t(field.label)}</label>
            <Select
                value={_.find(items, { id: field.value }) ? _.find(items, { id: field.value }) : null}
                inputId={field.name ? field.name : options.name}
                onChange={(option) => { field.sync(option ? option.id : ''); onChange(option); }}
                options={items}
                isMulti={options.multi}
                placeholder={field.placeholder ? field.placeholder : options.placeholder}
                name={field.name ? field.name : options.name}
                isSearchable={options.isSearchable}
                isClearable={options.isClearable}
                className={options.className}
                classNamePrefix={options.classNamePrefix}
                autoFocus={options.autoFocus}
                isDisabled={field.disabled}
                isOptionDisabled={option => option.disabled}
                getOptionLabel={option => option[options.textField]}
                getOptionValue={option => option[options.dataItemKey]}
            />
            {renderIf(isSome(field.error))(
                <p className="type--tiny type--color--error">{field.error}</p>
            )}
        </div>
    )
}

export default defaultTemplate(BaasicFieldDropdownTemplate);
