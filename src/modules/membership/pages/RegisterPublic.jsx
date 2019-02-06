import React from 'react';
import { inject, observer } from 'mobx-react';
import { RegisterPublicTemplate } from 'themes/modules/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/membership/stores';

@setCurrentView(rootStore => new RegisterViewStore(rootStore))
@observer
export default class RegisterPublic extends React.Component {
  render() {
    return <RegisterPublicTemplate {...this.props} />;
  }
}
