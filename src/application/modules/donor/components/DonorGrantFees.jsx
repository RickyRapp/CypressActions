import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorGrantFeesTemplate } from 'themes/application/donor/components';
import { DonorGrantFeesViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorGrantFeesViewStore(rootStore, props.donorId), 'donorGrantFeesViewStore')
@observer
class DonorGrantFees extends React.Component {
    render() {
        return <DonorGrantFeesTemplate {...this.props} />
    }
}

export default DonorGrantFees;