import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityListTabTemplate } from 'themes/application/administration/charity/pages';
import { CharityListTabViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore) => new CharityListTabViewStore(rootStore), 'charityListTabViewStore')
@observer
class CharityListTab extends React.Component {
    render() {
        return <CharityListTabTemplate {...this.props} />
    }
}

export default CharityListTab;
