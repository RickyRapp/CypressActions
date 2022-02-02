import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { AllTransactionListTemplate } from 'themes/application/charity/activity/pages';
import { AllTransactionViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore, props) => new AllTransactionViewStore(rootStore, props), 'allTransactionViewStore')
@observer
class AllTransactionList extends React.Component {
    render() {
        return <AllTransactionListTemplate {...this.props} />
    }
}

export default AllTransactionList;
