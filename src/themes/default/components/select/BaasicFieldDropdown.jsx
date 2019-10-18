import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultTemplate } from 'core/hoc';
import { BaasicDropdown } from 'core/components';
import { isSome, renderIf } from 'core/utils';

const BaasicFieldDropdownTemplate = function ({ store, field, multi, className, itemRender, valueRender, additionalLabel = null, t }) {
    function onChange(event) {
        const value = event.target.value;
        if (value) {
            if (store.options.multi) {
                field.set(value);
                if (value.length === 0) {
                    field.showErrors(true);
                }
            } else {
                field.set(value[store.options.dataItemKey]);
            }
        }
        store.onChange(value);
    }

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;
    const warningClasses = classNames({
        'input--warning': !field.isValid && field.touched && !field.isDirty
    });

    return (
        <div>
            <div className='form__group__label'>{t(field.label)}{requiredMark}{additionalLabel}</div>
            <BaasicDropdown
                {...field.bind()}
                store={store}
                placeholder={field.placeholder}
                value={field.value}
                onChange={onChange}
                multi={multi}
                className={className}
                warningClassName={warningClasses}
                itemRender={itemRender}
                valueRender={valueRender}
            />
            {(!field.isValid || field.hasError) &&
                renderIf(isSome(field.localizedError))(
                    <div className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>
                )}
        </div>
    );
};

BaasicFieldDropdownTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    multi: PropTypes.bool,
    className: PropTypes.string,
    itemRender: PropTypes.any,
    valueRender: PropTypes.any,
    additionalLabel: PropTypes.any,
    t: PropTypes.any
};

export default defaultTemplate(BaasicFieldDropdownTemplate);
