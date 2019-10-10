import React from 'react';
import { CharityEditTemplate } from 'themes/application/charity/pages';
import { observer } from 'mobx-react';
import { CharityEditViewStore } from 'application/charity/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new CharityEditViewStore(rootStore), 'charityEditViewStore')
@observer
class CharityEdit extends React.Component {
    render() {
        return <CharityEditTemplate {...this.props} />
    }
}

export default CharityEdit;
