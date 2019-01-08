import React from 'react';
import { UserEditTemplate } from 'themes/platform/modules/user/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { UserEditViewStore } from 'platform/modules/user/stores';

@setCurrentView((rootStore) => new UserEditViewStore(rootStore), "editView")
@observer
class UserEdit extends React.Component {
    render() {
        return <UserEditTemplate {...this.props} />
    }
}

export default UserEdit;