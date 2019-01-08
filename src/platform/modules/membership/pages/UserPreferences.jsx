import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserPreferencesTemplate } from 'themes/platform/modules/membership/pages';

@inject((i) => ({
    membershipStore: i.rootStore.platform.membership
}))
@observer
class UserPreferences extends React.Component {
    render() {
        return <UserPreferencesTemplate {...this.props} />
    }
}

export default UserPreferences;