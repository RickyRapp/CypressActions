import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionTemplate } from 'themes/application/donor/activity/transaction/components';
import { TransactionViewStore } from 'application/donor/activity/transaction/stores';

@setCurrentView((rootStore) => new TransactionViewStore(rootStore), 'transactionViewStore')
@observer
class Transaction extends React.Component {
    render() {
        return <TransactionTemplate {...this.props} />
    }
}

export default Transaction;
