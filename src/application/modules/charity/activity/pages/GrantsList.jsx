import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantsListTemplate } from 'themes/application/charity/activity/pages';
import { GrantsViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore) => new GrantsViewStore(rootStore), 'grantsViewStore')
@observer
class GrantsList extends React.Component {
    render() {
        return <GrantsListTemplate {...this.props} />
    }
}

export default GrantsList;
