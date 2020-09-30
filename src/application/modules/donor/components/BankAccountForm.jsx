import React from 'react';
import { BankAccountFormTemplate } from 'themes/application/donor/components';
import { BankAccountFormViewStore } from 'application/donor/stores';
import { setCurrentView } from 'core/utils';
import { observer } from 'mobx-react';

@setCurrentView((rootStore, props) => new BankAccountFormViewStore(rootStore, props.modalParams.data), 'bankAccountFormViewStore')
@observer
class BankAccountForm extends React.Component {
    render() {
        return <BankAccountFormTemplate {...this.props} />
    }
}

export default BankAccountForm;
