import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountProfileEditTemplate } from 'themes/modules/administration/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileEditViewStore } from 'modules/administration/donor-account/stores';

@setCurrentView((rootStore, { donorAccount }) => new DonorAccountProfileEditViewStore(rootStore, { fetchedDonorAccount: donorAccount }), 'donorAccountProfileEditViewStore')
@observer
class DonorAccountProfileEdit extends React.Component {
    render() {
        return <DonorAccountProfileEditTemplate {...this.props} />
    }
}

export default DonorAccountProfileEdit;