import React from 'react';
import { inject, observer } from 'mobx-react';
import { ActivationConfirmTemplate } from 'themes/modules/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/membership/stores';

@setCurrentView(rootStore => new RegisterViewStore(rootStore))
@observer
export default class ActivationConfirm extends React.Component {
  componentDidMount() {
    this.props.currentView.handleActivation();
  }

  render() {
    return <ActivationConfirmTemplate {...this.props} />;
  }
}
