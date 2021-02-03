import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { InvestmentPoolListTemplate } from 'themes/application/administration/investment/pages';
import { InvestmentPoolViewStore } from 'application/administration/investment/stores';

@setCurrentView((rootStore) => new InvestmentPoolViewStore(rootStore), 'investmentPoolViewStore')
@observer
class InvestmentPoolList extends React.Component {
    render() {
        return <InvestmentPoolListTemplate {...this.props} />
    }
}

export default InvestmentPoolList;
