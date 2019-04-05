import React from 'react';
import { DonorAccountSearchTemplate } from 'themes/modules/donor-account/components';
import { inject } from "mobx-react";

@inject(i => ({
  rootStore: i.rootStore
}))
class DonorAccountSearch extends React.Component {
  render() {
    return <DonorAccountSearchTemplate {...this.props} />;
  }
}

export default DonorAccountSearch;
