import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorAccountSearchTemplate } from 'themes/modules/administration/donor-account/components';
import { DonorAccountSearchViewStore } from 'modules/administration/donor-account/stores';

@setCurrentView((rootStore, props) => new DonorAccountSearchViewStore(rootStore, { donorAccountId: props.donorAccountId, onChange: props.onChange }), 'donorAccountSearchViewStore')
@observer
class DonorAccountSearch extends React.Component {
  render() {
    return <DonorAccountSearchTemplate {...this.props} />;
  }
}

export default DonorAccountSearch;
