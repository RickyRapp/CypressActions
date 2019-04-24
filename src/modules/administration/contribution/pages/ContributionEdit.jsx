import React from 'react';
import { ContributionEditTemplate } from 'themes/modules/administration/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionEditViewStore } from 'modules/administration/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionEditViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionEdit extends React.Component {
    render() {
        return <ContributionEditTemplate {...this.props} />;
    }
}

export default ContributionEdit;
