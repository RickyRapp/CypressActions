import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWebsiteDonationsPreferencesTemplate } from 'themes/application/charity/charity/components';
import { CharityWebsiteDonationsPreferencesViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityWebsiteDonationsPreferencesViewStore(rootStore), 'charityWebsiteDonationsPreferencesViewStore')
@observer
class CharityWebsiteDonationsPreferences extends React.Component {
    render() {
        return <CharityWebsiteDonationsPreferencesTemplate {...this.props} />
    }
}

export default CharityWebsiteDonationsPreferences;