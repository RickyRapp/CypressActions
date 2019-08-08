import React from 'react';
import { observer } from 'mobx-react';
import { GrantListTemplate } from 'themes/modules/main/grant/pages';
import { setCurrentView } from 'core/utils';
import { GrantListViewStore } from 'modules/main/grant/stores';

@setCurrentView(rootStore => new GrantListViewStore(rootStore), 'grantListViewStore')
@observer
class GrantList extends React.Component {
    render() {
        return <GrantListTemplate {...this.props} />;
    }
}

export default GrantList;