import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityOnlineAccountPreviewTemplate } from 'themes/application/charity/components';
import { CharityOnlineAccountPreviewViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityOnlineAccountPreviewViewStore(rootStore), 'charityOnlineAccountPreviewViewStore')
@observer
class CharityOnlineAccountPreview extends React.Component {
    render() {
        return <CharityOnlineAccountPreviewTemplate {...this.props} />
    }
}

export default CharityOnlineAccountPreview;
