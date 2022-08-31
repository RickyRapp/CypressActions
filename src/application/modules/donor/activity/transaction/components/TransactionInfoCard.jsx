import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionInfoCardTemplate } from 'themes/application/donor/activity/transaction/components';
import { TransactionDonorViewStore } from 'application/donor/activity/transaction/stores';

@setCurrentView((rootStore) => new TransactionDonorViewStore(rootStore), 'transactionDonorViewStore')
@observer
class TransactionInfoCard extends React.Component {
    render() {
        return <TransactionInfoCardTemplate {...this.props} />
    }
}

export default TransactionInfoCard;
