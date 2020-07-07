import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountInvestmentPoolHistoryTemplate } from 'themes/application/donor-account/components';
import { DonorAccountInvestmentPoolHistoryViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore, props) => new DonorAccountInvestmentPoolHistoryViewStore(rootStore, props.id), 'donorAccountInvestmentPoolHistoryViewStore')
@observer
class DonorAccountInvestmentPoolHistory extends React.Component {
    render() {
        return <DonorAccountInvestmentPoolHistoryTemplate {...this.props} />
    }
}

export default DonorAccountInvestmentPoolHistory;
