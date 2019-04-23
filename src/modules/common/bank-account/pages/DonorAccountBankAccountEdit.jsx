import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountBankAccountEditTemplate } from 'themes/modules/common/bank-account/pages';
import { DonorAccountBankAccountEditViewStore } from 'modules/common/bank-account/stores';

@setCurrentView((rootStore, props) => new DonorAccountBankAccountEditViewStore(rootStore, { userId: props.userId }), 'donorAccountBankAccountEditViewStore')
@observer
class DonorAccountBankAccountEdit extends React.Component {
    render() {
        return <DonorAccountBankAccountEditTemplate {...this.props} />
    }
}

export default DonorAccountBankAccountEdit;