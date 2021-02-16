import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { WelcomeExistingAccountsEmailsTemplate } from 'themes/application/administration/test/pages';
import { WelcomeExistingAccountsEmailsViewStore } from 'application/administration/test/stores';

@setCurrentView((rootStore) => new WelcomeExistingAccountsEmailsViewStore(rootStore), 'welcomeExistingAccountsEmailsViewStore')
@observer
class WelcomeExistingAccountsEmails extends React.Component {
    render() {
        return <WelcomeExistingAccountsEmailsTemplate {...this.props} />
    }
}

export default WelcomeExistingAccountsEmails;
