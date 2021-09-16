import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantEditTemplate } from 'themes/application/administration/grant/pages';
import { GrantEditViewStore } from 'application/common/grant/stores';

@setCurrentView((rootStore) => new GrantEditViewStore(rootStore, { grantStore: rootStore.application.administration.grantStore, donorId: rootStore.routerStore.routerState.params.id }), 'grantEditViewStore')
@observer
class GrantEdit extends React.Component {
    render() {
        return <GrantEditTemplate {...this.props} />
    }
}

export default GrantEdit;
