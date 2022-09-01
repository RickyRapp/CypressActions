import React from 'react';
import { observer } from 'mobx-react';
import { InsightsCardTemplate } from 'themes/application/donor/grant/components';
import { defaultTemplate } from 'core/hoc';

@observer
class InsightsCard extends React.Component {
    render() {
        return <InsightsCardTemplate {...this.props} />
    }
}

export default defaultTemplate(InsightsCard);
