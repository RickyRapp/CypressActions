import React from 'react';
import { observer } from 'mobx-react';
import { RoleListTemplate } from 'themes/application/role/pages';
import { setCurrentView } from 'core/utils';
import { RoleViewStore } from 'application/role/stores';

@setCurrentView((rootStore) => new RoleViewStore(rootStore), 'listViewStore')
@observer
class RoleList extends React.Component {
    render() {
        return <RoleListTemplate {...this.props} />
    }
}

export default RoleList;