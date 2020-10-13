import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionTemplate } from 'themes/application/activity/components';
import { TransactionViewStore } from 'application/activity/stores';

@setCurrentView((rootStore, props) => new TransactionViewStore(rootStore, props.onDonorChange), 'transactionViewStore')
@observer
class Transaction extends React.Component {
    render() {
        return <TransactionTemplate {...this.props} />
    }
}

export default Transaction;
