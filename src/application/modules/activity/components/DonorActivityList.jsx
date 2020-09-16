import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorActivityListTemplate } from 'themes/application/activity/components';
import { DonorActivityViewStore } from 'application/activity/stores';

@setCurrentView((rootStore) => new DonorActivityViewStore(rootStore), 'store')
@observer
class DonorActivityList extends React.Component {
    render() {
        return <DonorActivityListTemplate {...this.props} />
    }
}

export default DonorActivityList;
