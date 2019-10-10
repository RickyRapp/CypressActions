import React from 'react';
import { CharityCreateTemplate } from 'themes/application/charity/pages';
import { observer } from 'mobx-react';
import { CharityCreateViewStore } from 'application/charity/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new CharityCreateViewStore(rootStore), 'charityCreateViewStore')
@observer
class CharityCreate extends React.Component {
    render() {
        return <CharityCreateTemplate {...this.props} />
    }
}

export default CharityCreate;
