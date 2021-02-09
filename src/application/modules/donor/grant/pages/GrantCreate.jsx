import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantCreateTemplate } from 'themes/application/donor/grant/pages';
import { GrantCreateViewStore } from 'application/common/grant/stores';

@setCurrentView((rootStore) => new GrantCreateViewStore(rootStore, { grantStore: rootStore.application.donor.grantStore, donorId: rootStore.userStore.applicationUser.id }), 'grantCreateViewStore')
@observer
class GrantCreate extends React.Component {
    render() {
        return <GrantCreateTemplate {...this.props} />
    }
}

export default GrantCreate;
