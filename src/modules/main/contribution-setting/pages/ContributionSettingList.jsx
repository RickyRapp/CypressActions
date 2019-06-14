import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingListTemplate } from 'themes/modules/main/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { BaseContributionSettingListViewStore } from 'modules/common/contribution-setting/stores';

@setCurrentView(rootStore => new BaseContributionSettingListViewStore(rootStore, { userId: rootStore.authStore.user.id }), 'contributionSettingListViewStore')
@observer
class ContributionSettingList extends React.Component {
    render() {
        return <ContributionSettingListTemplate {...this.props} />;
    }
}

export default ContributionSettingList;