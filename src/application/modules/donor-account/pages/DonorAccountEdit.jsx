import React from 'react';
import { DonorAccountEditTemplate } from 'themes/application/donor-account/pages';
import { observer } from 'mobx-react';
import { DonorAccountEditViewStore } from 'application/donor-account/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new DonorAccountEditViewStore(rootStore), 'donorAccountEditViewStore')
@observer
class DonorAccountEdit extends React.Component {
    render() {
        return <DonorAccountEditTemplate {...this.props} />
    }
}

export default DonorAccountEdit;
