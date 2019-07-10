import React from 'react';
import { ContributionDetailsTemplate } from 'themes/modules/common/contribution/pages';
import { observer } from 'mobx-react';
import { ContributionDetailsViewStore } from 'modules/common/contribution/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore, props) => new ContributionDetailsViewStore(rootStore, { id: props.id, highlightId: props.highlightId }), 'contributionDetailsViewStore')
@observer
class ContributionDetails extends React.Component {
    render() {
        return <ContributionDetailsTemplate {...this.props} />;
    }
}

export default ContributionDetails;
