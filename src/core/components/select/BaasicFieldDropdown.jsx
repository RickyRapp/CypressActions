import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { BaasicFieldDropdownTemplate } from 'themes/components';

@observer
class BaasicFieldDropdown extends Component {
    render() {
        const { field, store, multi, className, itemRender, valueRender, additionalLabel } = this.props;
        return (
            <BaasicFieldDropdownTemplate
                store={store}
                field={field}
                multi={multi}
                className={className}
                itemRender={itemRender}
                valueRender={valueRender}
                additionalLabel={additionalLabel}
            />
        );
    }
}

BaasicFieldDropdown.propTypes = {
    field: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    multi: PropTypes.bool,
    className: PropTypes.string,
    itemRender: PropTypes.any,
    valueRender: PropTypes.any,
    additionalLabel: PropTypes.any
};

export default BaasicFieldDropdown;
