import React from 'react';
import { observer } from 'mobx-react';
import { ActivationConfirmTemplate } from 'themes/modules/administration/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/administration/membership/stores';

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
