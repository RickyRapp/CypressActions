import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { InsightsCardTemplate } from 'themes/application/donor/grant/components';
import { GrantCreateViewStore } from 'application/common/grant/stores';
import { defaultTemplate } from 'core/hoc';

@setCurrentView((rootStore) => new GrantCreateViewStore(rootStore, { grantStore: rootStore.application.donor.grantStore, donorId: rootStore.userStore.applicationUser.id }), 'grantCreateViewStore')
@observer
class InsightsCard extends React.Component {
    render() {
        return <InsightsCardTemplate {...this.props} />
    }
}

export default defaultTemplate(InsightsCard);
