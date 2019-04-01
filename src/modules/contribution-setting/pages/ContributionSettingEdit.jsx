import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingEditTemplate } from 'themes/modules/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { ContributionSettingEditViewStore } from 'modules/contribution-setting/stores';

@setCurrentView((rootStore, { item, onAfterUpdate, bankAccounts, contributionSettingType }) => new ContributionSettingEditViewStore(rootStore, item, onAfterUpdate, bankAccounts, contributionSettingType), 'contributionSettingEditViewStore')
@observer
class ContributionSettingEdit extends React.Component {
    render() {
        return <ContributionSettingEditTemplate {...this.props} />;
    }
}

export default ContributionSettingEdit;