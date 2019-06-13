import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingCreateEditTemplate } from 'themes/modules/common/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { ContributionSettingCreateEditViewStore } from 'modules/common/contribution-setting/stores';

@setCurrentView((rootStore, props) =>
    new ContributionSettingCreateEditViewStore(rootStore,
        {
            onAfterCreate: props.onAfterCreate,
            onAfterUpdate: props.onAfterUpdate,
            bankAccounts: props.bankAccounts,
            contributionSettingType: props.contributionSettingType,
            editItem: props.item,
            id: props.id,
            userId: props.userId
        }), 'contributionSettingCreateViewStore')
@observer
class ContributionSettingCreateEdit extends React.Component {
    render() {
        return <ContributionSettingCreateEditTemplate {...this.props} />;
    }
}

export default ContributionSettingCreateEdit;