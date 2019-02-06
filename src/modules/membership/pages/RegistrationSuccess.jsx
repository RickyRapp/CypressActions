import React from 'react';
import { observer } from 'mobx-react';
import { RegistrationSuccessTemplate } from 'themes/modules/membership/pages';
import { setCurrentView } from 'core/utils';
import { MembershipViewStore } from 'modules/membership/stores';

@setCurrentView(rootStore => new MembershipViewStore(rootStore))
@observer
export default class RegistrationSuccess extends React.Component {
  render() {
    return <RegistrationSuccessTemplate {...this.props} />;
  }
}
