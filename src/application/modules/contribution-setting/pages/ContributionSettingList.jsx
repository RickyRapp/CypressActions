import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionSettingListTemplate } from 'themes/application/contribution-setting/pages';
import { ContributionSettingViewStore } from 'application/contribution-setting/stores';

@setCurrentView((rootStore) => new ContributionSettingViewStore(rootStore), 'contributionSettingViewStore')
@observer
class ContributionSettingList extends React.Component {
    render() {
        return <ContributionSettingListTemplate {...this.props} />
    }
}

export default ContributionSettingList;
