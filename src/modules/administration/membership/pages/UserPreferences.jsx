import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserPreferencesTemplate } from 'themes/modules/administration/membership/pages';

@inject(i => ({
  membershipStore: i.rootStore.authStore
}))
@observer
class UserPreferences extends React.Component {
  render() {
    return <UserPreferencesTemplate {...this.props} />;
  }
}

export default UserPreferences;
