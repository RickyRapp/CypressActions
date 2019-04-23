import React from 'react';
import { observer, inject } from 'mobx-react';
import { DisplayErrorTemplate } from 'themes/modules/common/root/pages';

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
