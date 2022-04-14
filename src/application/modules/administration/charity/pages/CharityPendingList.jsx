import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityPendingListTemplate } from 'themes/application/administration/charity/pages';
import { CharityPendingListViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityPendingListViewStore(rootStore), 'charityPendingListViewStore')
@observer
class CharityPendingList extends React.Component {
    render() {
        return <CharityPendingListTemplate {...this.props} />
    }
}

export default CharityPendingList;
