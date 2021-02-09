import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { InvestmentPoolChangeTemplate } from 'themes/application/administration/investment/components';
import { InvestmentPoolChangeViewStore } from 'application/administration/investment/stores';

@setCurrentView((rootStore, props) => new InvestmentPoolChangeViewStore(rootStore, props.modalParams.data.onAfterAction), 'investmentPoolChangeViewStore')
@observer
class InvestmentPoolChange extends React.Component {
    render() {
        return <InvestmentPoolChangeTemplate {...this.props} />
    }
}

export default InvestmentPoolChange;
