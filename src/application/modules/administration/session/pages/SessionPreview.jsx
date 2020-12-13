import React from 'react';
import { SessionPreviewTemplate } from 'themes/application/administration/session/pages';
import { observer } from 'mobx-react';
import { SessionPreviewViewStore } from 'application/administration/session/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new SessionPreviewViewStore(rootStore), 'sessionPreviewViewStore')
@observer
class SessionPreview extends React.Component {
    render() {
        return <SessionPreviewTemplate {...this.props} />
    }
}

export default SessionPreview;
