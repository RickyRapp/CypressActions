import React from 'react';
import { inject, observer } from 'mobx-react';
import { RoleEditTemplate } from 'themes/platform/modules/role/pages';
import { RoleEditViewStore } from 'platform/modules/role/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new RoleEditViewStore(rootStore), "editView")
@observer
class RoleEdit extends React.Component {
    render() {
        return <RoleEditTemplate {...this.props} />
    }
}

export default RoleEdit;