import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityChangeUsernameTemplate } from 'themes/application/charity/charity/components';
import { CharityChangeUsernameViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityChangeUsernameViewStore(rootStore), 'charityChangeUsernameViewStore')
@observer
class CharityChangeUsername extends React.Component {
    render() {
        return <CharityChangeUsernameTemplate {...this.props} />
    }
}

export default CharityChangeUsername;