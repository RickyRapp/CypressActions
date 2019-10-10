import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { SettledPaymentTransactionTemplate } from 'themes/application/activity-and-history/components';
import { SettledPaymentTransactionViewStore } from 'application/activity-and-history/stores';

@setCurrentView((rootStore, props) => new SettledPaymentTransactionViewStore(rootStore, { id: props.id }), 'settledPaymentTransactionViewStore')
@observer
class SettledPaymentTransaction extends React.Component {
    render() {
        return <SettledPaymentTransactionTemplate {...this.props} />
    }
}

export default SettledPaymentTransaction;
