import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PastGrantListTemplate } from 'themes/application/donation/pages';
import { PastGrantViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new PastGrantViewStore(rootStore), 'pastGrantViewStore')
@observer
class PastGrantList extends React.Component {
    render() {
        return <PastGrantListTemplate {...this.props} />
    }
}

export default PastGrantList;
