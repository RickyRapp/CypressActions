import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import classNames from 'classnames';

import * as _ from "lodash";

import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';

const BaasicDropdownTemplate = function (props) {
    const { store, t, placeholder, className, warningClassName, ...assignProps } = props;
    let timeout = null;

    function onChange(event) {
        onChangeFn(event);
    }

    function onFilter(event) {
        // clearTimeout(timeout);
        // timeout = setTimeout(() => {
        //     let filterValue = null;
        //
        //     if (event.filter.value && event.filter.value !== "") {
        //         filterValue = event.filter.value;
        //     }
        //
        //     store.onFilter(filterValue);
        // }, store.options.filterDebounce);
        store.onFilter(event.filter.value);
    }

    function onChangeFn(e) {
        if (props.onChange) {
            props.onChange(e);
            return;
        }
        store.onChange(e.target.value);
    }

    function getValue() {
        const value = props.value || store.value;
        // const value = _.has(props, 'value') ? props.value : store.value;
        if (_.isString(value)) {
            return store.items.find(i => i[store.options.dataItemKey] === value);
        }
        // else if (Array.isArray(value)) {
        //     return _.intersectionWith(store.items, value, (first, second) => first[store.options.dataItemKey] === second[store.options.dataItemKey]);
        // }
        else {
            return value;
        }

        // return _.isString(value)
        //     ? store.items.find(i => i[store.options.dataItemKey] === value)
        //     : value;
    }

    function getDefaultItem() {
        const item = !_.isNull(store.options.defaultItem) && !_.isUndefined(store.options.defaultItem)
            ? store.options.defaultItem
            : _.find(store.items, i => i.default === true);

        return item ? {
            ...item,
            [store.options.textField]: t(item[store.options.textField]),
            [store.options.dataItemKey]: item[store.options.dataItemKey] || null
        } : undefined;
    }

    function isMulti() {
        return props.multi != null ? props.multi : store.options.multi;
    }

    const Component = isMulti() ? MultiSelect : DropDownList;

    const hasCustomClass = (className != null && className !== '');
    const hasWarningClass = (warningClassName != null && warningClassName !== '');
    const styleClasses = classNames({
        [className]: hasCustomClass,
        [warningClassName]: hasWarningClass,
        "input--multiselect": isMulti() && !hasCustomClass,
        "input--dropdown": !isMulti() && !hasCustomClass
    });

    return (
        <Component
            {...assignProps}
            className={styleClasses}
            data={_.filter(store.items, i => i.hideInDropdown !== true)}
            textField={store.options.textField}
            filter={store.filterTerm}
            autoClose={store.options.autoClose}
            dataItemKey={store.options.dataItemKey}
            filterable={store.options.filterable}
            disabled={store.options.disabled}
            onFilterChange={onFilter}
            onChange={onChange}
            loading={store.loading}
            onOpen={store.onOpen}
            onClose={store.onClose}
            value={getValue()}
            label={
                placeholder
                    ? t(placeholder)
                    : t(store.options.placeholder)
            }
            defaultItem={getDefaultItem()}
            popupSettings={store.options.popupSettings}
            ref={multiselect => multiselect && multiselect.setState({ focusedIndex: -1 })}
        />
    )
};

BaasicDropdownTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    // data: PropTypes.array,
    // textField: PropTypes.string,
    // dataItemKey: PropTypes.string,
    // filterable: PropTypes.bool,
    // onFilterChange: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
    warningClassName: PropTypes.string,
    // loading: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    multi: PropTypes.bool,
    // filterDebounce: PropTypes.number
};

// BaasicDropdownTemplate.defaultProps = {
//     data: [],
//     textField: 'label',
//     dataItemKey: 'value',
//     filterable: false,
//     onFilterChange: () => {},
//     onChange: () => {},
//     loading: false,
//     label: 'Select a value',
//     filterDebounce: 500
// };

export default defaultTemplate(BaasicDropdownTemplate);
