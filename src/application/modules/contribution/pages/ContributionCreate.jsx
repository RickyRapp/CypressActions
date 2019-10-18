import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionCreateTemplate } from 'themes/application/contribution/pages';
import { ContributionCreateViewStore } from 'application/contribution/stores';

@setCurrentView((rootStore) => new ContributionCreateViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionCreate extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />
    }
}

export default ContributionCreate;
