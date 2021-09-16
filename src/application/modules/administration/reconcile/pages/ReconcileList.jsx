import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReconcileListTemplate } from 'themes/application/administration/reconcile/pages';
import { ReconcileViewStore } from 'application/administration/reconcile/stores';

@setCurrentView((rootStore) => new ReconcileViewStore(rootStore), 'reconcileViewStore')
@observer
class ReconcileList extends React.Component {
    render() {
        return <ReconcileListTemplate {...this.props} />
    }
}

export default ReconcileList;
