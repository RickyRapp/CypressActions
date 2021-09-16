import React from 'react';
import { CharityCreateTemplate } from 'themes/application/administration/charity/pages';
import { observer } from 'mobx-react';
import { CharityCreateViewStore } from 'application/administration/charity/stores';
import { setCurrentView } from 'core/utils';

@setCurrentView((rootStore) => new CharityCreateViewStore(rootStore), 'charityCreateViewStore')
@observer
class CharityCreate extends React.Component {
    render() {
        return <CharityCreateTemplate {...this.props} />
    }
}

export default CharityCreate;
