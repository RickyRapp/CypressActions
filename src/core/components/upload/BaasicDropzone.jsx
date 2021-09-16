import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaasicDropzoneTemplate } from 'themes/components';
import { inject, observer } from 'mobx-react';

@inject(e => ({
    modalStore: e.rootStore.modalStore
}))
@observer
class BaasicDropzone extends Component {
    render() {
        return (
            <BaasicDropzoneTemplate {...this.props} store={this.props.store} />
        );
    }
}

BaasicDropzone.propTypes = {
    store: PropTypes.object.isRequired
};

export default BaasicDropzone;
