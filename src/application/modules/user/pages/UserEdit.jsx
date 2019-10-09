import React from 'react';
import { UserEditTemplate } from 'themes/application/user/pages';
import { observer } from 'mobx-react';
import { UserEditViewStore } from 'application/user/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new UserEditViewStore(rootStore), 'userEditViewStore')
@observer
class UserEdit extends React.Component {
    render() {
        return <UserEditTemplate {...this.props} />
    }
}

export default UserEdit;
