import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityGrantRequestCreateTemplate } from 'themes/application/charity/components';
import { CharityGrantRequestCreateViewStore } from 'application/charity/stores';

@setCurrentView((rootStore, props) => new CharityGrantRequestCreateViewStore(
    rootStore,
    {
        id: props.charityId,
        onAfterAction: props.modalParams.data.onAfterAction
    }
), 'charityGrantRequestCreateViewStore')
@observer
class CharityGrantRequestCreate extends React.Component {
    render() {
        return <CharityGrantRequestCreateTemplate {...this.props} />
    }
}

export default CharityGrantRequestCreate;
