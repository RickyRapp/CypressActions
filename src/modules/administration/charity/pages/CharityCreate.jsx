import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityCreateTemplate } from 'themes/modules/administration/charity/pages';
import { CharityCreateViewStore } from 'modules/administration/charity/stores';

@setCurrentView(rootStore => new CharityCreateViewStore(rootStore), 'charityCreateViewStore')
@observer
class CharityCreate extends React.Component {
    render() {
        return <CharityCreateTemplate {...this.props} />;
    }
}

export default CharityCreate;
