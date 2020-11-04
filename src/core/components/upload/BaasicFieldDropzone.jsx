import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaasicFieldDropzoneTemplate } from 'themes/components';
import { observer } from 'mobx-react';

@observer
class BaasicFieldDropzone extends Component {
    render() {
        return (
            <BaasicFieldDropzoneTemplate {...this.props} field={this.props.field} store={this.props.store} />
        );
    }
}

BaasicFieldDropzone.propTypes = {
    field: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

export default BaasicFieldDropzone;
