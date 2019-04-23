import React from 'react';
import { observer } from 'mobx-react';
import { RegisterTemplate } from 'themes/modules/administration/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/administration/membership/stores';

@setCurrentView(rootStore => new RegisterViewStore(rootStore))
@observer
export default class Register extends React.Component {
  render() {
    return <RegisterTemplate {...this.props} />;
  }
}
