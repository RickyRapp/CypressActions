import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PastGrantListTemplate } from 'themes/application/donor/activity/grant/pages';
import { PastGrantViewStore } from 'application/donor/activity/grant/stores';

@setCurrentView((rootStore) => new PastGrantViewStore(rootStore), 'pastGrantViewStore')
@observer
class PastGrantList extends React.Component {
    render() {
        return <PastGrantListTemplate {...this.props} />
    }
}

export default PastGrantList;
