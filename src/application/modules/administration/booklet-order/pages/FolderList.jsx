import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FolderListTemplate } from 'themes/application/administration/booklet-order/pages';
import { FolderListViewStore } from 'application/administration/booklet-order/stores';

@setCurrentView((rootStore) => new FolderListViewStore(rootStore), 'folderListViewStore')
@observer
class FolderList extends React.Component {
    render() {
        return <FolderListTemplate {...this.props} />
    }
}

export default FolderList;
