import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGrantRequestListTemplate } from 'themes/application/charity/pages';
import { CharityGrantRequestViewStore } from 'application/charity/stores';

@setCurrentView((rootStore) => new CharityGrantRequestViewStore(rootStore), 'charityGrantRequestViewStore')
@observer
class CharityGrantRequestList extends React.Component {
    render() {
        return <CharityGrantRequestListTemplate {...this.props} />
    }
}

export default CharityGrantRequestList;
