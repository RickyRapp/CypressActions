import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionListTemplate } from 'themes/application/charity/accept-security/pages';
import { ContributionViewStore } from 'application/charity/accept-security/stores';

@setCurrentView((rootStore) => new ContributionViewStore(rootStore), 'contributionViewStore')
@observer
class ContributionList extends React.Component {
    render() {
        return <ContributionListTemplate {...this.props} />
    }
}

export default ContributionList;
