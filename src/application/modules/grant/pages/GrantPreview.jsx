import React from 'react';
import { GrantPreviewTemplate } from 'themes/application/grant/pages';
import { observer } from 'mobx-react';
import { GrantPreviewViewStore } from 'application/grant/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new GrantPreviewViewStore(rootStore), 'grantPreviewViewStore')
@observer
class GrantPreview extends React.Component {
    render() {
        return <GrantPreviewTemplate {...this.props} />
    }
}

export default GrantPreview;
