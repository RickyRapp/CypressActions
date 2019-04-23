import React from 'react';
import { ContributionCreateTemplate } from 'themes/modules/main/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionCreateViewStore } from 'modules/main/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionCreateViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionCreate extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />;
    }
}

export default ContributionCreate;
