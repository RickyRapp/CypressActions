import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorBankAccountListTemplate } from 'themes/application/donor/components';
import { DonorBankAccountViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorBankAccountViewStore(rootStore, props.donorId), 'donorBankAccountViewStore')
@observer
class DonorBankAccountList extends React.Component {
    render() {
        return <DonorBankAccountListTemplate {...this.props} />
    }
}

export default DonorBankAccountList;
