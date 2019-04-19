import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountProfileEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileAdministrationEditViewStore } from 'modules/donor-account/stores';

@setCurrentView((rootStore, { donorAccount }) => new DonorAccountProfileAdministrationEditViewStore(rootStore, { fetchedDonorAccount: donorAccount }), 'donorAccountProfileEditViewStore')
@observer
class DonorAccountProfileAdministrationEdit extends React.Component {
    render() {
        return <DonorAccountProfileEditTemplate {...this.props} />
    }
}

export default DonorAccountProfileAdministrationEdit;