import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { defaultTemplate } from 'core/hoc';
import { BaasicButton } from 'core/components';
import { isSome } from 'core/utils';

const BaasicDropdownTemplate = function (props) {
    const { store, t, placeholder, className, activeClassName, warningClassName, tag, ...assignProps } = props;

    function onChange(event) {
        onChangeFn(event);
    }

    function onFilter(event) {
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
        else {
            return value;
        }
    }

    function getFilterable() {
        if (isSome(props.filterable)) {
            return props.filterable;
        }

        return store.options.disabled;
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

    const hasCustomClass = className != null && className !== '';
    const hasActiveClass = tag && tag.value && store.value && store.value.id === tag.value.id;
    const hasWarningClass = warningClassName != null && warningClassName !== '';
    const styleClasses = classNames({
        [className]: hasCustomClass,
        [activeClassName]: hasActiveClass,
        [warningClassName]: hasWarningClass,
        'k-textbox-container k-dropdown input--multiselect': isMulti() && !hasCustomClass,
        'input--dropdown': !isMulti() && !hasCustomClass,
        focused: store.isOpen || null,
    });

    return (
        <React.Fragment>
            <div className="u-pos--relative">
                <Component
                    {...assignProps}
                    className={styleClasses}
                    data={_.filter(store.items, i => i.hideInDropdown !== true)}
                    textField={store.options.textField}
                    filter={store.filterTerm}
                    autoClose={store.options.autoClose}
                    dataItemKey={store.options.dataItemKey}
                    filterable={getFilterable()}
                    disabled={store.options.disabled}
                    onFilterChange={onFilter}
                    onChange={onChange}
                    loading={store.loading}
                    onOpen={store.onOpen}
                    onClose={store.onClose}
                    value={getValue()}
                    label={placeholder ? t(placeholder) : t(store.options.placeholder)}
                    defaultItem={getDefaultItem()}
                    popupSettings={store.options.popupSettings}
                    ref={multiselect => multiselect && multiselect.setState({ focusedIndex: -1 })}
                />
                {store.options.clearable && getValue() &&
                    <BaasicButton
                        onClick={() => onChange({ target: { value: null } })}
                        className="btn btn--icon"
                        icon='u-icon u-icon--sml u-icon--clear'
                        label="DROPDOWN.CLEAR_BUTTON"
                        onlyIcon
                        disabled={store.options.disabled}
                    />}
            </div>
        </React.Fragment>
    )
};

BaasicDropdownTemplate.propTypes = {
    store: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    warningClassName: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    multi: PropTypes.bool,
    tag: PropTypes.object,
    filterable: PropTypes.bool,
    t: PropTypes.func,
};

export default defaultTemplate(BaasicDropdownTemplate);
