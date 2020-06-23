import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountInvestmentListTemplate } from 'themes/application/donor-account/components';
import { DonorAccountInvestmentListViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountInvestmentListViewStore(rootStore), 'donorAccountInvestmentListViewStore')
@observer
class DonorAccountInvestmentList extends React.Component {
    render() {
        return <DonorAccountInvestmentListTemplate {...this.props} />
    }
}

export default DonorAccountInvestmentList;
