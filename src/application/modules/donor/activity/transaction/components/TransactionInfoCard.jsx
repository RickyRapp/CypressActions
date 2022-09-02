import React from 'react';
import { observer } from 'mobx-react';
import { TransactionInfoCardTemplate } from 'themes/application/donor/activity/transaction/components';

@observer
class TransactionInfoCard extends React.Component {
    render() {
        return <TransactionInfoCardTemplate {...this.props} />
    }
}

export default TransactionInfoCard;
