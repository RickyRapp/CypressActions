import React from 'react';
import { observer } from 'mobx-react';
import { RoleListTemplate } from 'themes/platform/modules/role/pages';
import { setCurrentView } from 'core/utils';
import { RoleListViewStore } from 'platform/modules/role/stores';

@setCurrentView((rootStore) => new RoleListViewStore(rootStore))
@observer
class RoleList extends React.Component {
    render() {
        return <RoleListTemplate {...this.props} />
    }
}

export default RoleList;