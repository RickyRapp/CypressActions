import React from 'react';
import { ContributionCreateTemplate } from 'themes/modules/administration/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionCreateViewStore } from 'modules/administration/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView(rootStore => new ContributionCreateViewStore(rootStore), 'contributionCreateViewStore')
@observer
class ContributionCreate extends React.Component {
    render() {
        return <ContributionCreateTemplate {...this.props} />;
    }
}

export default ContributionCreate;
