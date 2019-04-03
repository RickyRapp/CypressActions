import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankAccountEditTemplate } from 'themes/modules/bank-account/pages';
import { BankAccountEditViewStore } from 'modules/bank-account/stores';

@setCurrentView((rootStore, props) => new BankAccountEditViewStore(rootStore, { id: props.id, onAfterCreate: props.onAfterCreate, item: props.item }), 'bankAccountEditViewStore')
@observer
class BankAccountEdit extends React.Component {
    render() {
        return <BankAccountEditTemplate {...this.props} />
    }
}

export default BankAccountEdit;