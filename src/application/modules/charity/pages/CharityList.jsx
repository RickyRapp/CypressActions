import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityListTemplate } from 'themes/application/charity/pages';
import { CharityViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityViewStore(rootStore), 'charityViewStore')
@observer
class CharityList extends React.Component {
    render() {
        return <CharityListTemplate {...this.props} />
    }
}

export default CharityList;
