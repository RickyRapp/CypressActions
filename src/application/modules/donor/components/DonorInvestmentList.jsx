import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorInvestmentListTemplate } from 'themes/application/donor/components';
import { DonorInvestmentListViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorInvestmentListViewStore(rootStore), 'donorInvestmentListViewStore')
@observer
class DonorInvestmentList extends React.Component {
    render() {
        return <DonorInvestmentListTemplate {...this.props} />
    }
}

export default DonorInvestmentList;
