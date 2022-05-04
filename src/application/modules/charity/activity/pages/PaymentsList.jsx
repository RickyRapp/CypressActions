import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PaymentsListTemplate } from 'themes/application/charity/activity/pages';
import { PaymentsViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore) => new PaymentsViewStore(rootStore), 'paymentsViewStore')
@observer
class PaymentsList extends React.Component {
    render() {
        return <PaymentsListTemplate {...this.props} />
    }
}

export default PaymentsList;
