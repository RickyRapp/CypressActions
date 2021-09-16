import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionDetailsTemplate } from 'themes/application/donor/contribution/pages';
import { ContributionDetailsViewStore } from 'application/donor/contribution/stores';

@setCurrentView((rootStore) => new ContributionDetailsViewStore(rootStore), 'contributionDetailsViewStore')
@observer
class ContributionDetails extends React.Component {
    render() {
        return <ContributionDetailsTemplate {...this.props} />
    }
}

export default ContributionDetails;
