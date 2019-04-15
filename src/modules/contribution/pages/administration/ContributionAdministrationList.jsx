import React from 'react';
import { observer } from 'mobx-react';
import { ContributionAdministrationListTemplate } from 'themes/modules/contribution/pages';
import { setCurrentView } from 'core/utils';
import { ContributionAdministrationListViewStore } from 'modules/contribution/stores';

@setCurrentView(rootStore => new ContributionAdministrationListViewStore(rootStore), 'contributionAdministrationListViewStore')
@observer
class ContributionAdministrationList extends React.Component {
    render() {
        return <ContributionAdministrationListTemplate {...this.props} />;
    }
}

export default ContributionAdministrationList;