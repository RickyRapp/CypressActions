import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { TransactionEditTemplate } from 'themes/application/reconcile/components';
import { TransactionEditViewStore } from 'application/reconcile/stores';

@setCurrentView((rootStore, props) => new TransactionEditViewStore(rootStore, {
    transaction: props.modalParams.data.transaction,
    onAfterEdit: props.modalParams.data.onAfterEdit
}), 'transactionEditViewStore')
@observer
class TransactionEdit extends React.Component {
    render() {
        return <TransactionEditTemplate {...this.props} />
    }
}

export default TransactionEdit;
