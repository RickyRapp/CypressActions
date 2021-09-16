import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { BaasicFieldDropdownTemplate } from 'themes/components';

@observer
class BaasicFieldDropdown extends Component {
    render() {
        const { store, ...restProps } = this.props;
        return <BaasicFieldDropdownTemplate {...restProps} store={store} />;
    }
}

BaasicFieldDropdown.propTypes = {
    store: PropTypes.object.isRequired,
};

export default BaasicFieldDropdown;
