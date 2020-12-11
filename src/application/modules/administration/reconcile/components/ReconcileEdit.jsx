import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReconcileEditTemplate } from 'themes/application/administration/reconcile/components';
import { ReconcileEditViewStore } from 'application/administration/reconcile/stores';

@setCurrentView((rootStore, props) => new ReconcileEditViewStore(rootStore, {
    reconcile: props.modalParams.data.reconcile,
    onAfterEdit: props.modalParams.data.onAfterEdit
}), 'reconcileEditViewStore')
@observer
class ReconcileEdit extends React.Component {
    render() {
        return <ReconcileEditTemplate {...this.props} />
    }
}

export default ReconcileEdit;
