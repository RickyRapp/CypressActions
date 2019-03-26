import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';
import _ from 'lodash';

function BaasicFieldDropdownTemplate({ store, field }) {
    const {
        options,
        onChange,
        items
    } = store;

    return (
        <React.Fragment>
            <Select
                value={_.find(items, { id: field.value }) ? _.find(items, { id: field.value }) : null}
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
            {renderIf(isSome(field.error))(
                <p className="type--tiny type--color--error">{field.error}</p>
            )}
        </React.Fragment>
    )
}

export default defaultTemplate(BaasicFieldDropdownTemplate);
