import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { UserListTemplate } from 'themes/application/user/pages';
import { UserViewStore } from 'application/user/stores';

@setCurrentView((rootStore) => new UserViewStore(rootStore), 'userViewStore')
@observer
class UserList extends React.Component {
    render() {
        return <UserListTemplate {...this.props} />
    }
}

export default UserList;
