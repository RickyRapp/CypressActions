import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RemoteDepositListTemplate } from 'themes/application/charity/activity/pages';
import { RemoteDepositsViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore, props) => new RemoteDepositsViewStore(rootStore, props), 'remoteDepositsViewStore')
@observer
class RemoteDepositsList extends React.Component {
    render() {
        return <RemoteDepositListTemplate {...this.props} />
    }
}

export default RemoteDepositsList;
