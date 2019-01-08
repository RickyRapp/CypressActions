import React from 'react';
import { observer } from 'mobx-react';
import { UserListTemplate } from 'themes/platform/modules/user/pages';
import { setCurrentView } from 'core/utils';
import { UserListViewStore } from 'platform/modules/user/stores';

@setCurrentView((rootStore) => new UserListViewStore(rootStore))
@observer
class UserList extends React.Component {
    render() {
        return <UserListTemplate {...this.props} />
    }
}

export default UserList;