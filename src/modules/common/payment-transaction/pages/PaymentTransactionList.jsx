import React from 'react';
import { observer } from 'mobx-react';
import { PaymentTransactionListTemplate } from 'themes/modules/common/payment-transaction/pages';
import { setCurrentView } from 'core/utils';
import { PaymentTransactionListViewStore } from 'modules/common/payment-transaction/stores';

@setCurrentView((rootStore, props) => new PaymentTransactionListViewStore(rootStore, { items: props.items }), 'paymentTransactionListViewStore')
@observer
class PaymentTransactionList extends React.Component {
    render() {
        return <PaymentTransactionListTemplate {...this.props} />;
    }
}

export default PaymentTransactionList;