import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountProfileEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileMainEditViewStore } from 'modules/donor-account/stores';

@setCurrentView((rootStore, { fetchedDonorAccount }) => new DonorAccountProfileMainEditViewStore(rootStore, fetchedDonorAccount), 'donorAccountProfileEditViewStore')
@observer
class DonorAccountProfileAdministrationEdit extends React.Component {
    render() {
        return <DonorAccountProfileEditTemplate {...this.props} />
    }
}

export default DonorAccountProfileAdministrationEdit;