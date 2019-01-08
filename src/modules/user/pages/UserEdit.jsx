import React from 'react';
import { UserEditTemplate } from 'themes/modules/user/pages';
import { observer } from 'mobx-react';
import { UserEditViewStore } from 'modules/user/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new UserEditViewStore(rootStore), "editView")
@observer
class UserEdit extends React.Component {
    render() {
        return <UserEditTemplate {...this.props} />
    }
}

export default UserEdit;