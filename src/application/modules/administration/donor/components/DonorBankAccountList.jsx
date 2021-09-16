import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorBankAccountListTemplate } from 'themes/application/administration/donor/components';
import { DonorBankAccountViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorBankAccountViewStore(rootStore), 'donorBankAccountViewStore')
@observer
class DonorBankAccountList extends React.Component {
    render() {
        return <DonorBankAccountListTemplate {...this.props} />
    }
}

export default DonorBankAccountList;
