import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';

class DropdownFilterTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.items = null;
        this.state = { items: null };

        this.onDropwdownChange = this.onDropwdownChange.bind(this)
    }

    onDropwdownChange(event) {
        let setItems = [];
        if (event && event.length > 0) {
            _.forEach(event, function (x) {
                if (x.id && x.name) {
                    setItems.push({ 'id': x.id, 'name': x.name })
                }
            });
        }
        this.setState({ items: setItems });
        this.props.queryUtility.filter[this.props.name] = _.map(setItems, e => { return e.id });
    }

    render() {
        const {
            defaultValue,
            options,
            loading
        } = this.props.dropdownStore;

        let items = [];
        _.forEach(this.state.items, function (x) {
            items.push({ 'id': x.id, 'name': x.name })
        });

        return (
            <AsyncSelect
                value={items}
                defaultValue={defaultValue}
                onChange={this.onDropwdownChange}
                placeholder={options.placeholder}
                name={name}
                isDisabled={options.disabled}
                isMulti={options.multi}
                isClearable={options.clearable}
                isLoading={loading}
                cacheOptions={true}
                getOptionLabel={option => option[options.textField]}
                getOptionValue={option => option[options.dataItemKey]}
                defaultOptions={true} //  tells the control to immediately fire the remote request, described by your loadOptions
                loadOptions={(input, callback) => {
                    this.props.dropdownStore.onFilter({ value: input }).then(() => {
                        callback(this.props.dropdownStore.items);
                    });
                }}
            />
        );
    }
}

DropdownFilterTemplate.propTypes = {
    queryUtility: PropTypes.object,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    isClearable: PropTypes.bool
};

DropdownFilterTemplate.defaultProps = {
    name: 'search',
    className: 'input input--med input--search w--250--px',
    placeholder: 'Search',
    type: 'text',
    isClearable: true

};

export default defaultTemplate(DropdownFilterTemplate);
