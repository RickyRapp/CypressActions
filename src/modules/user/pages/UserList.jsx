import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { UserListTemplate } from 'themes/modules/user/pages';
import { UserListViewStore } from 'modules/user/stores';

@setCurrentView((rootStore) => new UserListViewStore(rootStore), "listViewStore")
@observer
class UserList extends React.Component {
    render() {
        return <UserListTemplate {...this.props} />
    }
}

export default UserList;