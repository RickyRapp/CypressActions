import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionCreateTemplate } from 'themes/application/contribution/pages';
import { ContributionEditViewStore } from 'application/contribution/stores';

@setCurrentView((rootStore) => new ContributionEditViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />
    }
}

export default ContributionEdit;
