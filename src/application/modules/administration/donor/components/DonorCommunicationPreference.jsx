import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DonorCommunicationPreferenceTemplate } from 'themes/application/administration/donor/components';
import { DonorCommunicationPreferenceViewStore } from 'application/administration/donor/stores';

@setCurrentView((rootStore) => new DonorCommunicationPreferenceViewStore(rootStore), 'donorCommunicationPreferenceViewStore')
@observer
class DonorCommunicationPreference extends React.Component {
    render() {
        return <DonorCommunicationPreferenceTemplate {...this.props} />
    }
}

export default DonorCommunicationPreference;
