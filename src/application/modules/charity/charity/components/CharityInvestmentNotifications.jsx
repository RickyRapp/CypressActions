import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityInvestmentNotificationsTemplate } from 'themes/application/charity/charity/components';
import { CharityInvestmentNotificationsViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityInvestmentNotificationsViewStore(rootStore), 'charityInvestmentNotificationsViewStore')
@observer
class CharityInvestmentNotifications extends React.Component {
    render() {
        return <CharityInvestmentNotificationsTemplate {...this.props} />
    }
}

export default CharityInvestmentNotifications;