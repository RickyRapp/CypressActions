import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionDetailsTemplate } from 'themes/application/charity/accept-security/pages';
import { ContributionDetailsViewStore } from 'application/charity/accept-security/stores';

@setCurrentView((rootStore) => new ContributionDetailsViewStore(rootStore), 'contributionDetailsViewStore')
@observer
class ContributionDetails extends React.Component {
    render() {
        return <ContributionDetailsTemplate {...this.props} />
    }
}

export default ContributionDetails;
