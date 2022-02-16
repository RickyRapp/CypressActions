import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGeneralNotificationsTemplate } from 'themes/application/charity/charity/components';
import { CharityGeneralNotificationsViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityGeneralNotificationsViewStore(rootStore), 'charityGeneralNotificationsViewStore')
@observer
class CharityGeneralNotifications extends React.Component {
    render() {
        return <CharityGeneralNotificationsTemplate {...this.props} />
    }
}

export default CharityGeneralNotifications;