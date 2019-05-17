import React from 'react';
import { observer } from 'mobx-react';
import { CharityEditTemplate } from 'themes/modules/main/charity/pages';
import { setCurrentView } from 'core/utils';
import { CharityEditViewStore } from 'modules/main/charity/stores';

@setCurrentView((rootStore, props) => new CharityEditViewStore(rootStore, { userId: props.userId }), 'charityEditViewStore')
@observer
class CharityEdit extends React.Component {
    render() {
        return <CharityEditTemplate {...this.props} />
    }
}

export default CharityEdit;