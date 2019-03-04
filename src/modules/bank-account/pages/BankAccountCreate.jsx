import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankAccountCreateTemplate } from 'themes/modules/bank-account/pages';
import { BankAccountEditViewStore } from 'modules/bank-account/stores';

@setCurrentView((rootStore, props) => new BankAccountEditViewStore(rootStore, { id: props.id, onAfterCreate: props.onAfterCreate }), 'bankAccountEditViewStore')
@observer
class BankAccountCreate extends React.Component {
    render() {
        return <BankAccountCreateTemplate {...this.props} />
    }
}

export default BankAccountCreate;