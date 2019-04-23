import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingCreateTemplate } from 'themes/modules/administration/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { ContributionSettingCreateViewStore } from 'modules/administration/contribution-setting/stores';

@setCurrentView((rootStore, { onAfterCreate, bankAccounts, contributionSettingType }) => new ContributionSettingCreateViewStore(rootStore, onAfterCreate, bankAccounts, contributionSettingType), 'contributionSettingCreateViewStore')
@observer
class ContributionSettingCreate extends React.Component {
    render() {
        return <ContributionSettingCreateTemplate {...this.props} />;
    }
}

export default ContributionSettingCreate;