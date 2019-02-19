import React from 'react';
import { observer } from 'mobx-react';
import { AddressEditTemplate } from 'themes/modules/address/pages';

@observer
class AddressEdit extends React.Component {
    render() {
        return <AddressEditTemplate {...this.props} />
    }
}

export default AddressEdit;