import React from 'react';
import { UserPasswordChangeTemplate } from 'themes/modules/administration/user/pages';
import { observer } from 'mobx-react';

@observer
class UserPasswordChange extends React.Component {
  render() {
    return <UserPasswordChangeTemplate {...this.props} />;
  }
}

export default UserPasswordChange;
