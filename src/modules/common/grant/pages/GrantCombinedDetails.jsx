import React from 'react';
import { GrantCombinedDetailsTemplate } from 'themes/modules/common/grant/pages';
import { observer } from 'mobx-react';
import { GrantCombinedDetailsViewStore } from 'modules/common/grant/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new GrantCombinedDetailsViewStore(rootStore, { id: rootStore.routerStore.routerState.params.id }), 'grantDetailsViewStore')
@observer
class GrantCombinedDetails extends React.Component {
    render() {
        return <GrantCombinedDetailsTemplate {...this.props} />;
    }
}

export default GrantCombinedDetails;
