import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { DepositsInsightTemplate } from 'themes/application/charity/activity/pages';
import { DepositsInsightViewStore } from 'application/charity/activity/stores';

@setCurrentView((rootStore) => new DepositsInsightViewStore(rootStore), 'depositsInsightViewStore')
@observer
class DepositsInsight extends React.Component {
    render() {
        return <DepositsInsightTemplate {...this.props} />
    }
}

export default DepositsInsight;
