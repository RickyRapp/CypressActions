import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountProfileEditTemplate } from 'themes/modules/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountProfileEditViewStore } from 'modules/donor-account/stores';

@setCurrentView(rootStore => new DonorAccountProfileEditViewStore(rootStore), 'profileEditViewStore')
@observer
class DonorAccountProfileEdit extends React.Component {
    render() {
        return <DonorAccountProfileEditTemplate {...this.props} />
    }
}

export default DonorAccountProfileEdit;