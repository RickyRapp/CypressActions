import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantCreateTemplate } from 'themes/application/administration/grant/pages';
import { GrantCreateViewStore } from 'application/common/grant/stores';

@setCurrentView((rootStore) => new GrantCreateViewStore(rootStore, { grantStore: rootStore.application.administration.grantStore, donorId: rootStore.routerStore.routerState.params.id }), 'grantCreateViewStore')
@observer
class GrantCreate extends React.Component {
    render() {
        return <GrantCreateTemplate {...this.props} />
    }
}

export default GrantCreate;
