import React from 'react';
import { inject, observer } from 'mobx-react';
import { UserCreateTemplate } from 'themes/platform/modules/user/pages';
import { UserCreateViewStore } from 'platform/modules/user/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new UserCreateViewStore(rootStore), "createView")
@observer
class UserCreate extends React.Component {
    render() {
        return <UserCreateTemplate {...this.props} />
    }
}

export default UserCreate;