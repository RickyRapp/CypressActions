import React from 'react';
import { RemoteDepositPreviewTemplate } from 'themes/application/charity/remote-deposit/pages';
import { observer } from 'mobx-react';
import { remoteDepositPreviewViewStore } from 'application/charity/remote-deposit/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new remoteDepositPreviewViewStore(rootStore), 'remoteDepositPreviewViewStore')
@observer
class remoteDepositPreview extends React.Component {
    render() {
        return <RemoteDepositPreviewTemplate {...this.props} />
    }
}

export default remoteDepositPreview;
