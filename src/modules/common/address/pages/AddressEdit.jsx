import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AddressEditViewStore } from 'modules/common/address/stores';
import { AddressEditTemplate } from 'themes/modules/common/address/pages';

@setCurrentView((rootStore, props) => new AddressEditViewStore(rootStore, { id: props.id, onAfterUpdate: props.onAfterUpdate, item: props.item }), 'addressEditViewStore')
@observer
class AddressEdit extends React.Component {
    render() {
        return <AddressEditTemplate {...this.props} />
    }
}

export default AddressEdit;