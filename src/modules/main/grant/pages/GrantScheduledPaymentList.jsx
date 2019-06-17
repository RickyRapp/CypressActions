import React from 'react';
import { observer } from 'mobx-react';
import { GrantScheduledPaymentListTemplate } from 'themes/modules/main/grant/pages';
import { setCurrentView } from 'core/utils';
import { GrantScheduledPaymentListViewStore } from 'modules/main/grant/stores';

@setCurrentView(rootStore => new GrantScheduledPaymentListViewStore(rootStore), 'grantScheduledPaymentListViewStore')
@observer
class GrantScheduledPaymentList extends React.Component {
    render() {
        return <GrantScheduledPaymentListTemplate {...this.props} />;
    }
}

export default GrantScheduledPaymentList;