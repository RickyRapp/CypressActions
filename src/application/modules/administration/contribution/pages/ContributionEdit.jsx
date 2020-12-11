import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { ContributionEditTemplate } from 'themes/application/administration/contribution/pages';
import { ContributionEditViewStore } from 'application/administration/contribution/stores';

@setCurrentView((rootStore) => new ContributionEditViewStore(rootStore), 'contributionEditViewStore')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionEditTemplate {...this.props} />
    }
}

export default ContributionEdit;
