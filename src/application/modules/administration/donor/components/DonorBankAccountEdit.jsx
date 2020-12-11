import React from 'react';
import { DonorBankAccountEditTemplate } from 'themes/application/administration/donor/components';
import { DonorBankAccountEditViewStore } from 'application/administration/donor/stores';
import { setCurrentView } from 'core/utils';
import { observer } from 'mobx-react';

@setCurrentView((rootStore, props) => new DonorBankAccountEditViewStore(rootStore, props.modalParams.data), 'donorBankAccountEditViewStore')
@observer
class DonorBankAccountEdit extends React.Component {
    render() {
        return <DonorBankAccountEditTemplate {...this.props} />
    }
}

export default DonorBankAccountEdit;
