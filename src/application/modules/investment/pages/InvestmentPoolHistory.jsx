import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { InvestmentPoolHistoryTemplate } from 'themes/application/investment/pages';
import { InvestmentPoolHistoryViewStore } from 'application/investment/stores';

@setCurrentView((rootStore, props) => new InvestmentPoolHistoryViewStore(rootStore, props.investmentPoolId), 'investmentPoolHistoryViewStore')
@observer
class InvestmentPoolHistory extends React.Component {
    render() {
        return <InvestmentPoolHistoryTemplate {...this.props} />
    }
}

export default InvestmentPoolHistory;
