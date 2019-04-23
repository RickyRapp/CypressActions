import React from 'react';
import { observer } from 'mobx-react';
import { RegisterPublicTemplate } from 'themes/modules/administration/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/administration/membership/stores';

@setCurrentView(rootStore => new RegisterViewStore(rootStore))
@observer
export default class RegisterPublic extends React.Component {
  render() {
    return <RegisterPublicTemplate {...this.props} />;
  }
}
