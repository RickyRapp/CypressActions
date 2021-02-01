import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantEditTemplate } from 'themes/application/donor/grant/pages';
import { GrantEditViewStore } from 'application/common/grant/stores';

@setCurrentView((rootStore) => new GrantEditViewStore(rootStore, { grantStore: rootStore.application.donor.grantStore, donorId: rootStore.userStore.applicationUser.id }), 'grantEditViewStore')
@observer
class GrantEdit extends React.Component {
    render() {
        return <GrantEditTemplate {...this.props} />
    }
}

export default GrantEdit;
