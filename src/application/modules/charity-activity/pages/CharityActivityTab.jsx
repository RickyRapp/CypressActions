import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityActivityTabTemplate } from 'themes/application/charity-activity/pages';
import { CharityActivityTabViewStore } from 'application/charity-activity/stores';

@setCurrentView((rootStore) => new CharityActivityTabViewStore(rootStore), 'charityActivityTabViewStore')
@observer
class CharityActivityTab extends React.Component {
    render() {
        return <CharityActivityTabTemplate {...this.props} />
    }
}

export default CharityActivityTab;
