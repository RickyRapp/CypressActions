import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorCommunicationPreferenceTemplate } from 'themes/application/donor/components';
import { DonorCommunicationPreferenceViewStore } from 'application/donor/stores';

@setCurrentView((rootStore, props) => new DonorCommunicationPreferenceViewStore(rootStore, props.donorId), 'donorCommunicationPreferenceViewStore')
@observer
class DonorCommunicationPreference extends React.Component {
    render() {
        return <DonorCommunicationPreferenceTemplate {...this.props} />
    }
}

export default DonorCommunicationPreference;
