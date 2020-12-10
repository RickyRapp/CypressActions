import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionTabTemplate } from 'themes/application/donor/activity/transaction/pages';
import { TransactionTabViewStore } from 'application/donor/activity/transaction/stores';

@setCurrentView((rootStore) => new TransactionTabViewStore(rootStore), 'transactionTabViewStore')
@observer
class TransactionTab extends React.Component {
    render() {
        return <TransactionTabTemplate {...this.props} />
    }
}

export default TransactionTab;
