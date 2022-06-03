import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionTabViewStore } from '../stores';
import { ContributionTabTemplate } from 'themes/application/administration/contribution/pages';

@setCurrentView((rootStore) => new ContributionTabViewStore(rootStore), 'contributionTabViewStore')
@observer
class ContributionTab extends React.Component {
    render() {
        return <ContributionTabTemplate {...this.props} />
    }
}

export default ContributionTab;
