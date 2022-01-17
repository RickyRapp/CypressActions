import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ReconcileUploadFileTemplate } from 'themes/application/administration/reconcile/components';
import { ReconcileUploadFileViewStore } from 'application/administration/reconcile/stores';

@setCurrentView((rootStore) => new ReconcileUploadFileViewStore(rootStore), 'reconcileUploadFileViewStore')
@observer
class ReconcileUploadFile extends React.Component {
    render() {
        return <ReconcileUploadFileTemplate {...this.props} />
    }
}

export default ReconcileUploadFile;
