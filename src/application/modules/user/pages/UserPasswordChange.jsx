import React from 'react';
import { UserPasswordChangeTemplate } from 'themes/application/user/pages';
import { observer } from 'mobx-react';
import {setCurrentView} from 'core/utils';
import {UserPasswordChangeViewStore} from 'application/user/stores';

@setCurrentView((rootStore, componentProps) => new UserPasswordChangeViewStore(rootStore, componentProps), 'userPasswordChangeViewStore')
@observer
class UserPasswordChange extends React.Component {
    render() {
        return <UserPasswordChangeTemplate {...this.props} />
    }
}

export default UserPasswordChange;
