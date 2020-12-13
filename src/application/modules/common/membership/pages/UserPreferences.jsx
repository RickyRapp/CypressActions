import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserPreferencesTemplate } from 'themes/application/membership/pages';

@inject((i) => ({
    membershipStore: i.rootStore.application.baasic.membershipModule
}))
@observer
class UserPreferences extends React.Component {
    render() {
        return <UserPreferencesTemplate {...this.props} />
    }
}

export default UserPreferences;