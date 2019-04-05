import React from 'react';
import { ContributionDetailsTemplate } from 'themes/modules/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionDetailsViewStore } from 'modules/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionDetailsViewStore(rootStore), 'contributionDetailsViewStore')
@observer
class ContributionDetails extends React.Component {
    render() {
        return <ContributionDetailsTemplate {...this.props} />;
    }
}

export default ContributionDetails;
