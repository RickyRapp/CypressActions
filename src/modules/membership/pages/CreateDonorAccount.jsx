import React from 'react';
import { observer } from 'mobx-react';
import { RegisterPublicTemplate } from 'themes/modules/membership/pages';
import { Page } from 'core/layouts';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/membership/stores';

@setCurrentView(rootStore => new RegisterViewStore(rootStore))
@observer
export default class CreateDonorAccount extends React.Component {
  render() {
    return (
      <Page>
        <RegisterPublicTemplate {...this.props} />
      </Page>
    )
  }
}
