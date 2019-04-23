import React from 'react';
import { ContributionEditTemplate } from 'themes/modules/main/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionCreateViewStore } from 'modules/main/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionCreateViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionEditTemplate {...this.props} />;
    }
}

export default ContributionEdit;
