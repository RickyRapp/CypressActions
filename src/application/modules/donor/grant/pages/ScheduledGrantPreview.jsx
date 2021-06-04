import React from 'react';
import { ScheduledGrantPreviewTemplate } from 'themes/application/donor/grant/pages';
import { observer } from 'mobx-react';
import { ScheduledGrantPreviewViewStore } from 'application/donor/grant/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new ScheduledGrantPreviewViewStore(rootStore), 'scheduledGrantPreviewViewStore')
@observer
class ScheduledGrantPreview extends React.Component {
    render() {
        return <ScheduledGrantPreviewTemplate {...this.props} />
    }
}

export default ScheduledGrantPreview;
