import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorInvestmentListTemplate } from 'themes/application/investment/pages';
import { DonorInvestmentViewStore } from 'application/investment/stores';

@setCurrentView((rootStore) => new DonorInvestmentViewStore(rootStore), 'donorInvestmentViewStore')
@observer
class DonorInvestmentList extends React.Component {
    render() {
        return <DonorInvestmentListTemplate {...this.props} />
    }
}

export default DonorInvestmentList;
