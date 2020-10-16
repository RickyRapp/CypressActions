import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionDonorTemplate } from 'themes/application/activity/transaction/components';
import { TransactionDonorViewStore } from 'application/activity/transaction/stores';

@setCurrentView((rootStore) => new TransactionDonorViewStore(rootStore), 'transactionDonorViewStore')
@observer
class TransactionDonor extends React.Component {
    render() {
        return <TransactionDonorTemplate {...this.props} />
    }
}

export default TransactionDonor;
