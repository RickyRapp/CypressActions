import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountBankAccountListTableTemplate } from 'themes/application/donor-account/components';
import { DonorAccountBankAccountViewStore } from 'application/donor-account/stores';

@setCurrentView((rootStore) => new DonorAccountBankAccountViewStore(rootStore), 'donorAccountBankAccountViewStore')
@observer
class DonorAccountBankAccountListTable extends React.Component {
    render() {
        return <DonorAccountBankAccountListTableTemplate {...this.props} />
    }
}

export default DonorAccountBankAccountListTable;
