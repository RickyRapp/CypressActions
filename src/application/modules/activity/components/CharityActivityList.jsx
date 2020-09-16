import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityActivityListTemplate } from 'themes/application/activity/components';
import { CharityActivityViewStore } from 'application/activity/stores';

@setCurrentView((rootStore) => new CharityActivityViewStore(rootStore), 'store')
@observer
class CharityActivityList extends React.Component {
    render() {
        return <CharityActivityListTemplate {...this.props} />
    }
}

export default CharityActivityList;
