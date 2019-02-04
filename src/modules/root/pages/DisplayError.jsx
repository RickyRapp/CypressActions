import React from 'react';
import { DisplayErrorTemplate } from 'themes/modules/root/pages';
import { observer, inject } from 'mobx-react';

@inject(i => ({
  errorStore: i.rootStore.errorStore
}))
@observer
class DisplayError extends React.Component {
  render() {
    return <DisplayErrorTemplate {...this.props} />;
  }
}

export default DisplayError;
