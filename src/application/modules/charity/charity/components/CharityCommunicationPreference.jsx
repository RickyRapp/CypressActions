import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityCommunicationPreferenceTemplate } from 'themes/application/charity/charity/components';
import { CharityCommunicationPreferenceViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityCommunicationPreferenceViewStore(rootStore), 'charityCommunicationPreferenceViewStore')
@observer
class CharityCommunicationPreference extends React.Component {
    render() {
        return <CharityCommunicationPreferenceTemplate {...this.props} />
    }
}

export default CharityCommunicationPreference;
