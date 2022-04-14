import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityPendingTabTemplate } from 'themes/application/administration/charity/pages';
import { CharityPendingTabViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityPendingTabViewStore(rootStore), 'charityPendingTabViewStore')
@observer
class CharityPendingTab extends React.Component {
    render() {
        return <CharityPendingTabTemplate {...this.props} />
    }
}

export default CharityPendingTab;
