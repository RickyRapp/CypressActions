import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReconcileCashedPreviewTemplate } from 'themes/application/administration/reconcile/components';
import { ReconcileCashedPreviewViewStore } from 'application/administration/reconcile/stores';

@setCurrentView((rootStore) => new ReconcileCashedPreviewViewStore(rootStore), 'ReconcileCashedPreviewViewStore')
@observer
class ReconcileCashedPreview extends React.Component {
    render() {
        return <ReconcileCashedPreviewTemplate {...this.props} />
    }
}

export default ReconcileCashedPreview;
