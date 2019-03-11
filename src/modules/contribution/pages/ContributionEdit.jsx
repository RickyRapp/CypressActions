import React from 'react';
import { ContributionEditTemplate } from 'themes/modules/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionEditViewStore } from 'modules/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionEditViewStore(rootStore), 'contributionEditViewStore')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionEditTemplate {...this.props} />;
    }
}

export default ContributionEdit;
