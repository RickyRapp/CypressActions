import React from 'react';
import { UserCreateTemplate } from 'themes/modules/user/pages';
import { observer } from 'mobx-react';
import { UserCreateViewStore } from 'modules/user/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new UserCreateViewStore(rootStore), "userCreateViewStore")
@observer
class UserCreate extends React.Component {
    render() {
        return <UserCreateTemplate {...this.props} />
    }
}

export default UserCreate;