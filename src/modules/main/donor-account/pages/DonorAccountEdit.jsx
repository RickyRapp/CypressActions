import React from 'react';
import { observer } from 'mobx-react';
import { DonorAccountEditTemplate } from 'themes/modules/main/donor-account/pages';
import { setCurrentView } from 'core/utils';
import { DonorAccountEditViewStore } from 'modules/main/donor-account/stores';

@setCurrentView((rootStore, props) => new DonorAccountEditViewStore(rootStore, { userId: props.userId }), 'donorAccountEditViewStore')
@observer
class DonorAccountEdit extends React.Component {
    render() {
        return <DonorAccountEditTemplate {...this.props} />
    }
}

export default DonorAccountEdit;