import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionDetailsTemplate } from 'themes/modules/main/contribution/pages';
import { ContributionDetailsViewStore } from 'modules/main/contribution/stores';

@setCurrentView(rootStore => new ContributionDetailsViewStore(rootStore), 'contributionDetailsViewStore')
@observer
class ContributionDetails extends React.Component {
    render() {
        return <ContributionDetailsTemplate {...this.props} />;
    }
}

export default ContributionDetails;
