import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AddressCreateViewStore } from 'modules/common/address/stores';
import { AddressCreateTemplate } from 'themes/modules/common/address/pages';

@setCurrentView((rootStore, props) => new AddressCreateViewStore(rootStore, { route: props.route, onAfterCreate: props.onAfterCreate, userId: props.userId }), 'addressCreateViewStore')
@observer
class AddressCreate extends React.Component {
    render() {
        return <AddressCreateTemplate {...this.props} />
    }
}

export default AddressCreate;