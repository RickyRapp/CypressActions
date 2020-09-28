import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaasicDropdownTemplate } from 'themes/components';

class BaasicDropdown extends Component {
    render() {
        return (
            <BaasicDropdownTemplate {...this.props} store={this.props.store} />
        );
    }
}

BaasicDropdown.propTypes = {
    store: PropTypes.object.isRequired
};

export default BaasicDropdown;
