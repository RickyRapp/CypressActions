import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { MediaUploadListViewStore } from 'modules/common/media-upload/stores';
import { DocumentListTemplate } from 'themes/modules/common/media-upload/pages';

@setCurrentView(rootStore => new MediaUploadListViewStore(rootStore), 'mediaUploadListViewStore')
@observer
class DocumentList extends React.Component {
    render() {
        return <DocumentListTemplate {...this.props} />;
    }
}

export default DocumentList;