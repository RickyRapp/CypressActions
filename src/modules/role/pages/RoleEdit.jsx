import React from 'react';
import { RoleEditTemplate } from 'themes/modules/role/pages';
import { observer } from 'mobx-react';
import { RoleEditViewStore } from 'modules/role/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new RoleEditViewStore(rootStore), "editView")
@observer
class RoleEdit extends React.Component {
    render() {
        return <RoleEditTemplate {...this.props} />
    }
}

export default RoleEdit;