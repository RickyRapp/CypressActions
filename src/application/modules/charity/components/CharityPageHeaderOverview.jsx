import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityPageHeaderOverviewTemplate } from 'themes/application/charity/components';
import { CharityPageHeaderOverviewViewStore } from 'application/charity/stores';

@setCurrentView((rootStore, props) => new CharityPageHeaderOverviewViewStore(rootStore, { type: props.type }), 'charityPageHeaderOverviewViewStore')
@observer
class CharityPageHeaderOverview extends React.Component {
    render() {
        return <CharityPageHeaderOverviewTemplate {...this.props} />
    }
}

export default CharityPageHeaderOverview;
