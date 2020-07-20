import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorInvestmentPoolHistoryTemplate } from 'themes/application/donor/components';
import { DonorInvestmentPoolHistoryViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorInvestmentPoolHistoryViewStore(rootStore, props.id), 'donorInvestmentPoolHistoryViewStore')
@observer
class DonorInvestmentPoolHistory extends React.Component {
    render() {
        return <DonorInvestmentPoolHistoryTemplate {...this.props} />
    }
}

export default DonorInvestmentPoolHistory;
