import React from 'react';
import { DonorAccountSearchTemplate } from 'themes/modules/donor-account/components';

class DonorAccountSearch extends React.Component {
  render() {
    return <DonorAccountSearchTemplate {...this.props} />;
  }
}

export default DonorAccountSearch;
