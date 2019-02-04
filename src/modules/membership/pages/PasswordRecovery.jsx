import React from 'react';
import { PasswordRecoveryTemplate } from 'themes/modules/membership/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PasswordRecoveryViewStore } from 'modules/membership/stores';

@setCurrentView(rootStore => new PasswordRecoveryViewStore(rootStore))
@observer
class PasswordRecovery extends React.Component {
  render() {
    return <PasswordRecoveryTemplate {...this.props} />;
  }
}

export default PasswordRecovery;
