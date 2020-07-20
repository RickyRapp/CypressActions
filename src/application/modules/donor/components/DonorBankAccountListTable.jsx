import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorBankAccountListTableTemplate } from 'themes/application/donor/components';
import { DonorBankAccountViewStore } from 'application/donor/stores';

@setCurrentView((rootStore) => new DonorBankAccountViewStore(rootStore), 'donorBankAccountViewStore')
@observer
class DonorBankAccountListTable extends React.Component {
    render() {
        return <DonorBankAccountListTableTemplate {...this.props} />
    }
}

export default DonorBankAccountListTable;
