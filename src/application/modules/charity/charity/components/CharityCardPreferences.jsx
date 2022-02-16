import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityCardPreferencesTemplate } from 'themes/application/charity/charity/components';
import { CharityCardPreferencesViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityCardPreferencesViewStore(rootStore), 'charityCardPreferencesViewStore')
@observer
class CharityCardPreferences extends React.Component {
    render() {
        return <CharityCardPreferencesTemplate {...this.props} />
    }
}

export default CharityCardPreferences;