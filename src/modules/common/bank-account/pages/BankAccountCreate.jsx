import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankAccountCreateTemplate } from 'themes/modules/common/bank-account/pages';
import { BankAccountCreateViewStore } from 'modules/common/bank-account/stores';

@setCurrentView((rootStore, props) => new BankAccountCreateViewStore(rootStore, { onAfterCreate: props.onAfterCreate, userId: props.userId }), 'bankAccountEditViewStore')
@observer
class BankAccountCreate extends React.Component {
    render() {
        return <BankAccountCreateTemplate {...this.props} />
    }
}

export default BankAccountCreate;