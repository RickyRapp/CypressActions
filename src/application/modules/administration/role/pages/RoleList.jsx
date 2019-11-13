import React from 'react';
import { observer } from 'mobx-react';
import { RoleListTemplate } from 'themes/application/administration/role/pages';
import { setCurrentView } from 'core/utils';
import { RoleViewStore } from 'application/administration/role/stores';

@setCurrentView((rootStore) => new RoleViewStore(rootStore), 'listViewStore')
@observer
class RoleList extends React.Component {
    render() {
        return <RoleListTemplate {...this.props} />
    }
}

export default RoleList;