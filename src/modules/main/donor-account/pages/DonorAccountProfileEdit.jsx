import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountProfileEditTemplate } from 'themes/modules/main/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileEditViewStore } from 'modules/main/donor-account/stores';

@setCurrentView((rootStore, { fetchedDonorAccount }) => new DonorAccountProfileEditViewStore(rootStore, fetchedDonorAccount), 'donorAccountProfileEditViewStore')
@observer
class DonorAccountProfileEdit extends React.Component {
    render() {
        return <DonorAccountProfileEditTemplate {...this.props} />
    }
}

export default DonorAccountProfileEdit;