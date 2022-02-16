import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityDescriptionTemplate } from 'themes/application/charity/charity/components';
import { CharityDescriptionViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityDescriptionViewStore(rootStore), 'charityDescriptionViewStore')
@observer
class CharityDescription extends React.Component {
    render() {
        return <CharityDescriptionTemplate {...this.props} />
    }
}

export default CharityDescription;