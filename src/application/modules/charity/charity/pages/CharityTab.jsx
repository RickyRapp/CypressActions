import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityTabTemplate } from 'themes/application/charity/charity/pages';
import { CharityTabViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityTabViewStore(rootStore), 'charityTabViewStore')
@observer
class CharityTab extends React.Component {
    render() {
        return <CharityTabTemplate {...this.props} />
    }
}

export default CharityTab;
