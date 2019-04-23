import React from 'react';
import { observer } from 'mobx-react';
import { ContributionSettingListTemplate } from 'themes/modules/main/contribution-setting/pages';
import { setCurrentView } from 'core/utils';
import { ContributionSettingListViewStore } from 'modules/main/contribution-setting/stores';

@setCurrentView(rootStore => new ContributionSettingListViewStore(rootStore), 'contributionSettingListViewStore')
@observer
class ContributionSettingList extends React.Component {
    render() {
        return <ContributionSettingListTemplate {...this.props} />;
    }
}

export default ContributionSettingList;