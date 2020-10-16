import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DepositTabTemplate } from 'themes/application/activity/deposit/pages';
import { DepositTabViewStore } from 'application/activity/deposit/stores';

@setCurrentView((rootStore) => new DepositTabViewStore(rootStore), 'depositTabViewStore')
@observer
class DepositTab extends React.Component {
    render() {
        return <DepositTabTemplate {...this.props} />
    }
}

export default DepositTab;
