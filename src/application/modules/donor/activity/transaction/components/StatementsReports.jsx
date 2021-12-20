import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { StatementsReportsTemplate } from 'themes/application/donor/activity/transaction/components';
import { StatementsReportsViewStore } from 'application/donor/activity/transaction/stores';

@setCurrentView((rootStore, props) => new StatementsReportsViewStore(rootStore, props), 'statementsReportsViewStore')
@observer
class StatementsReports extends React.Component {
    render() {
        return <StatementsReportsTemplate {...this.props} />
    }
}

export default StatementsReports;
