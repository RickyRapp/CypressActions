import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorRecordActivityListTemplate } from 'themes/application/administration/donor/components';
import { DonorRecordActivityViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore, props) => new DonorRecordActivityViewStore(rootStore, props.donorId), 'donorRecordActivityViewStore')
@observer
class DonorRecordActivityList extends React.Component {
    render() {
        return <DonorRecordActivityListTemplate {...this.props} />
    }
}

export default DonorRecordActivityList;