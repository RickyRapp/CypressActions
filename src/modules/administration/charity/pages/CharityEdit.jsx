import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityEditTemplate } from 'themes/modules/administration/charity/pages';
import { CharityEditViewStore } from 'modules/administration/charity/stores';

@setCurrentView(rootStore => new CharityEditViewStore(rootStore), 'charityEditViewStore')
@observer
class CharityEdit extends React.Component {
    render() {
        return <CharityEditTemplate {...this.props} />;
    }
}

export default CharityEdit;
