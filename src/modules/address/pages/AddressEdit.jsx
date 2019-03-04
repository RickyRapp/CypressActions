import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AddressEditViewStore } from 'modules/address/stores';
import { AddressEditTemplate } from 'themes/modules/address/pages';

@setCurrentView((rootStore, props) => new AddressEditViewStore(rootStore, { id: props.id, onAfterCreate: props.onAfterCreate }), 'addressEditViewStore')
@observer
class AddressEdit extends React.Component {
    render() {
        return <AddressEditTemplate {...this.props} />
    }
}

export default AddressEdit;