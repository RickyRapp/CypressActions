import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityListTemplate } from 'themes/modules/administration/charity/pages';
import { CharityListViewStore } from 'modules/administration/charity/stores';

@setCurrentView(rootStore => new CharityListViewStore(rootStore), 'charityListViewStore')
@observer
class CharityList extends React.Component {
    render() {
        return <CharityListTemplate {...this.props} />;
    }
}

export default CharityList;
