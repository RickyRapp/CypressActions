import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorInvestmentCreateTemplate } from 'themes/application/investment/pages';
import { DonorInvestmentCreateViewStore } from 'application/investment/stores';

@setCurrentView((rootStore) => new DonorInvestmentCreateViewStore(rootStore), 'donorInvestmentCreateViewStore')
@observer
class DonorInvestmentCreate extends React.Component {
    render() {
        return <DonorInvestmentCreateTemplate {...this.props} />
    }
}

export default DonorInvestmentCreate;
