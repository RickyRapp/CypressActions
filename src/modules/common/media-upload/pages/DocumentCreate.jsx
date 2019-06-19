import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { MediaUploadCreateViewStore } from 'modules/common/media-upload/stores';
import { DocumentCreateTemplate } from 'themes/modules/common/media-upload/pages';

@setCurrentView((rootStore, props) => new MediaUploadCreateViewStore(rootStore,
    {
        onRefresh: props.onRefresh,
        userId: props.userId,
        path: props.path,
        onAfterFileUpload: props.onAfterFileUpload,
        setAcceptFileExtensions: props.setAcceptFileExtensions
    }), 'mediaUploadCreateViewStore')
@observer
class DocumentCreate extends React.Component {
    render() {
        return <DocumentCreateTemplate {...this.props} />;
    }
}

export default DocumentCreate;