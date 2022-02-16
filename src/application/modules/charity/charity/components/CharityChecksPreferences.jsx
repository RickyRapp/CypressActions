import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityChecksPreferencesTemplate } from 'themes/application/charity/charity/components';
import { CharityChecksPreferencesViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityChecksPreferencesViewStore(rootStore), 'charityChecksPreferencesViewStore')
@observer
class CharityChecksPreferences extends React.Component {
    render() {
        return <CharityChecksPreferencesTemplate {...this.props} />
    }
}

export default CharityChecksPreferences;