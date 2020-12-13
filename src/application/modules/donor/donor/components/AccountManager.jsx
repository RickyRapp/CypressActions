import React from 'react';
import { AccountManagerTemplate } from 'themes/application/donor/donor/components';
import { AccountManagerViewStore } from 'application/donor/donor/stores';
import { setCurrentView } from 'core/utils';
import { observer } from 'mobx-react';

@setCurrentView((rootStore) => new AccountManagerViewStore(rootStore), 'accountManagerViewStore')
@observer
class AccountManager extends React.Component {
    render() {
        return <AccountManagerTemplate {...this.props} />
    }
}

export default AccountManager;
