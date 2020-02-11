import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGrantsListTemplate } from 'themes/application/charity/pages';
import { CharityGrantsViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityGrantsViewStore(rootStore), 'charityGrantsViewStore')
@observer
class CharityGrantsList extends React.Component {
    render() {
        return <CharityGrantsListTemplate {...this.props} />
    }
}

export default CharityGrantsList;
