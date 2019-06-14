import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingListTemplate } from 'themes/modules/administration/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { BaseContributionSettingListViewStore } from 'modules/common/contribution-setting/stores';

@setCurrentView(rootStore => new BaseContributionSettingListViewStore(rootStore, { userId: rootStore.routerStore.routerState.params.userId }), 'contributionSettingListViewStore')
@observer
class ContributionSettingList extends React.Component {
    render() {
        return <ContributionSettingListTemplate {...this.props} />;
    }
}

export default ContributionSettingList;