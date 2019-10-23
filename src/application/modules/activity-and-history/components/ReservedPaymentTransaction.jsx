import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReservedPaymentTransactionTemplate } from 'themes/application/activity-and-history/components';
import { ReservedPaymentTransactionViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore, props) => new ReservedPaymentTransactionViewStore(rootStore, { donorAccountId: props.donorAccountId }), 'reservedPaymentTransactionViewStore')
@observer
class ReservedPaymentTransaction extends React.Component {
    render() {
        return <ReservedPaymentTransactionTemplate {...this.props} />
    }
}

export default ReservedPaymentTransaction;
